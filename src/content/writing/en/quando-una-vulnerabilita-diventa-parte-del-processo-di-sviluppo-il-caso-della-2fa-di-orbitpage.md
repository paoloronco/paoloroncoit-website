---
title: "When a vulnerability becomes part of the development process: the OrbitPage 2FA case"
description: "How a vulnerability in OrbitPage's 2FA flow was handled responsibly, from the initial report to the fix, regression tests, and disclosure."
pubDate: 2026-09-15
tags: ["security", "OrbitPage", "open source", "2FA", "JWT"]
draft: false
---

Building a product also means accepting that security is never finished.

OrbitPage is a project I conceived, developed, and continue to maintain personally, both as a **managed SaaS** and as an **open-source, self-hosted edition** available on GitHub.

The project has gradually grown from a simple page builder into a broader platform that includes content and page management, a Shop, menus, analytics, privacy, SEO, teams, APIs, AI integrations, and many other features.

As the number of features grows, so does the surface that needs to be protected.

This process recently led to a particularly interesting case: the responsible disclosure of a vulnerability in the two-factor authentication flow of the open-source edition of OrbitPage.

The vulnerability was discovered by security researcher **Onurcan Genç**, who contacted me through the project's responsible disclosure process.

After confirming the report, I reproduced the behavior, analyzed its technical cause, and published a fix.

The case later became the subject of a technical analysis published by Onurcan himself.

## Where cybersecurity and development meet

I work professionally as a **Cybersecurity Analyst**.

My role is not primarily focused on vulnerability research or the systematic discovery of software vulnerabilities, but working in security every day inevitably influences how I design and develop systems.

When I build a product, I try to think not only about features, but also about:

* authentication and authorization;
* privilege separation;
* session management;
* secret protection;
* input validation;
* rate limiting;
* secure data handling;
* logging and troubleshooting;
* updates and dependencies;
* backup and recovery;
* responsible vulnerability management.

That does not make an application automatically immune to vulnerabilities.

On the contrary, one of the most important aspects of application security is building a process that can **receive a report, verify it, understand its impact, and deliver a fix quickly**.

The issue found in OrbitPage was a good example of that process.

## The report

The vulnerability was discovered and reported by **Onurcan Genç** ([GitHub](https://github.com/onurcangnc)), who deserves full credit for the discovery.

The issue affected OrbitPage's two-factor authentication flow.

OrbitPage supports TOTP authentication for administrator accounts. After a user enters the correct username and password, an account protected by 2FA does not immediately receive a normal authenticated session. Instead, the application creates a temporary challenge that must be completed with the second factor.

This challenge had:

* a limited lifetime;
* a specific `purpose`;
* a dedicated audience and issuer;
* an intended use restricted to the 2FA verification flow.

Logically, it was already a different token from a normal session token.

The problem was more subtle.

## The problem: two tokens with different purposes in the same trust domain

The 2FA challenge and normal session tokens were signed with the same JWT secret.

The challenge correctly included information that identified its purpose, but the standard session validation mechanism did not enforce a strong enough separation between the two classes of token.

Under certain conditions, a valid challenge JWT created during authentication could therefore be interpreted as a token accepted by the standard authentication layer.

More generally, this was not a cryptographic weakness in JWT.

The signature was valid.

The problem was **semantic and architectural**: two tokens belonging to different authentication stages shared the same trust domain.

A token that meant:

> “the password has been verified, but authentication is not yet complete”

should never have been interpreted as:

> “the user is fully authenticated.”

It may seem like a simple distinction, but it is a fundamental one in authentication systems.

## Reproduce first, fix second

After receiving the report, I did not immediately make a code change.

The first step was to reproduce the behavior.

I wanted to understand:

1. which conditions were required;
2. which component was accepting the token;
3. whether the issue originated in challenge generation or validation;
4. which other JWT flows might be involved;
5. where the correct boundary should be between pre-authentication and an authenticated session.

This step is particularly important.

A fix that changes only the payload used by the proof of concept risks removing the symptom without addressing the cause.

The goal was therefore to identify the problem at the **trust boundary**.

The analysis confirmed that the critical issue was the lack of strong separation between the session verifier and the 2FA challenge verifier.

## The fix

The fix was released in **OrbitPage 4.21.1**.

I introduced several layers of separation.

The first was a **separate signing domain for 2FA challenges**.

Normal session tokens continue to be signed with the instance's primary secret, while challenges use a dedicated signing context.

This means that a token created for the 2FA flow no longer belongs to the same cryptographic domain as a normal session.

The second change concerned validation.

The accepted algorithm is now specified explicitly when tokens are verified, preventing the verifier from implicitly accepting configurations other than the one intended.

The third layer directly addresses the meaning of the token.

The standard session verifier now explicitly rejects tokens that carry an application-level `purpose`, preventing a challenge from being treated as a session even independently of key separation.

The defense therefore does not depend on a single check.

It is now a layered separation:

**session token → session verifier → session signing domain**

**2FA challenge → 2FA verifier → 2FA signing domain**

This is a much stronger property than simply checking a field in the payload.

## Testing the behavior that must no longer be possible

Alongside the fix, I added tests specifically for the boundary between the two types of JWT.

The tests verify that:

* a normal session token is accepted by the session verifier;
* a 2FA challenge is accepted by the 2FA verifier;
* a 2FA challenge is rejected by the session verifier;
* a challenge built according to the previous model is also rejected as a normal session.

I consider that last step especially important.

Once a vulnerability has been fixed, it should also become a **regression test**.

That way, a future change to the authentication system cannot accidentally reintroduce the same behavior without causing the test suite to fail.

## From an individual fix to the project's security model

The work did not stop with the affected code.

OrbitPage now has a public security policy that explains how to report a vulnerability privately, what information to include, and how disclosure is handled.

Among other measures, the security model of the open-source edition includes:

* passwords stored using bcrypt hashing;
* signed, expiring JWT sessions;
* separation of two-factor authentication challenges;
* TOTP with recovery codes;
* session invalidation when credentials or authentication settings change;
* rate limiting on sensitive flows;
* parameterized queries;
* controlled management of `JWT_SECRET`;
* HTTPS recommended for production deployments;
* permission checks through distinct roles;
* documented backup, update, and recovery procedures.

For an open-source project, I believe it is important that these aspects do not remain hidden in the code.

Anyone installing the software should also be able to understand its operating model and which responsibilities remain with the instance administrator.

## Responsible disclosure

One point I particularly want to emphasize is how the vulnerability was handled.

**Onurcan Genç**, who discovered the issue, followed a responsible disclosure process that gave me time to analyze and fix it before the technical details were published.

I consider this the right model for security research on an open-source project.

The researcher can document the work and receive proper recognition, while the maintainer has an opportunity to protect users before the details become public.

After the fix was released, Onurcan published his own in-depth technical analysis of the vulnerability:

**Two-Factor Authentication Bypass via JWT Challenge Token Reuse**

His article describes the vulnerability from the security researcher's perspective and complements this account, which covers the same event from the perspective of OrbitPage's maintainer and developer.

Full credit for discovering the vulnerability therefore belongs to **Onurcan Genç**.

## GitHub Security Advisory and CVE

The vulnerability was handled through a **GitHub Security Advisory**, using the repository's designated channel for security reports.

The advisory makes it possible to keep the initial discussion between the researcher and maintainer private, coordinate the fix, and publish the information only after users have access to a corrected version.

I also requested a **CVE** through GitHub so that the vulnerability can receive a standard identifier recognized by vulnerability databases, scanners, and dependency and security management tools.

At the time of publication, the primary reference remains:

`GHSA-gfh5-m7w7-f6g2`

At the time of publication, no CVE has yet been assigned.

## Open source also means opening the code to review

This is one of the interesting aspects of OrbitPage's open-source edition.

Publishing the code allows external developers and security researchers to study it.

Naturally, this increases the chance that issues will be found.

I do not see that as a weakness of open source.

It is one of its strengths.

Complex software can hardly be considered secure simply because “nobody has found a vulnerability yet.”

It is far more meaningful to demonstrate that a process exists to handle one when it is found.

In this case, an external report led not only to a vulnerability fix, but also to stronger separation between JWT trust boundaries, new regression tests, and clearer documentation of the authentication model.

## What I take away from this experience

To me, OrbitPage is more than a development project.

It is also a real environment where I apply skills that normally span different disciplines: software development, cloud, DevOps, automation, and cybersecurity.

Being the **owner, creator, and developer of OrbitPage** means thinking about the product's entire lifecycle.

Not only how to implement a feature, but also how to:

* distribute it;
* maintain it;
* protect it;
* monitor it;
* update it;
* document it;
* and fix it when something does not work as intended.

This episode was a good example.

A vulnerability was discovered by an external researcher, disclosed responsibly, reproduced, analyzed, and fixed. The corrected version was released to users, and the vulnerable behavior became a permanent test case.

To me, that is an integral part of software development.

Security is not about claiming that a product has no vulnerabilities.

It is also about building the process required to respond properly when one is discovered.

---

### References

* **OrbitPage Open Source:** [github.com/paoloronco/OrbitPage](https://github.com/paoloronco/OrbitPage)
* **OrbitPage:** [orbitpage.com](https://orbitpage.com)
* **OrbitPage – project and case study:** [paoloronco.it/en/projects/orbitpage](https://paoloronco.it/en/projects/orbitpage)
* **GitHub Security Advisory:** [GHSA-gfh5-m7w7-f6g2](https://github.com/paoloronco/OrbitPage/security/advisories/GHSA-gfh5-m7w7-f6g2)
* **Onurcan Genç's analysis:** [Two-Factor Authentication Bypass via JWT Challenge Token Reuse](https://onurcangenc.com.tr/blog/two-factor-authentication-bypass-via-jwt-challenge-token-reuse)
* **Onurcan Genç – GitHub:** [github.com/onurcangnc](https://github.com/onurcangnc)
