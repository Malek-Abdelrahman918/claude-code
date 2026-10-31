import Link from "next/link";
import { CONTACT_EMAIL } from "../lib/config";

// Plain-language privacy policy for useleadsync.com. It describes what the site actually does
// today; if the site's behaviour changes (new tools, new trackers), update this page with it.
export default function PrivacyPolicy() {
  return (
    <section className="section section--compact on-dark" aria-label="Privacy policy">
      <div className="wrap">
        <div className="policy">
          <p className="small policy__meta">Last updated: 31 October 2026</p>

          <h2 id="who">1. Who we are</h2>
          <p>
            This website, useleadsync.com, is run by LeadSync, an AI implementation consultancy operated by Malek
            Abdelrahman and based in Egypt. LeadSync decides why and how the personal information described below is
            used, so it is the “controller” of that information. Contact us about anything in this policy at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2 id="collect">2. What we collect and why</h2>
          <h3>Contact form</h3>
          <p>
            Your name, work email, a description of your business and the task you lose time on. It is emailed to us
            and used only to reply to you. Legal basis: taking steps at your request, and our legitimate interest in
            answering enquiries.
          </p>
          <h3>Discovery call form</h3>
          <p>
            Your name, email, company, website, role, industry, company size, country, main challenge, a description of
            the problem, monthly budget range, and your agreement to be contacted. It is emailed to us and used to
            review your enquiry and arrange a call. Please do not include sensitive personal information (health,
            beliefs, and similar) in free-text boxes. Legal basis: your consent, which you give by ticking the box and
            can withdraw at any time.
          </p>
          <h3>Booking a time</h3>
          <p>
            After you submit the form, the page shows a Calendly scheduler. Your name and email are passed to it so you
            do not have to retype them. Calendly runs the scheduler and records your booking; it is a separate
            organisation with its own privacy policy. Calendly is only loaded at this step, not when you simply browse
            the site.
          </p>
          <h3>Technical data</h3>
          <p>
            Like every website, our host receives your IP address, browser type and the pages requested when your
            browser connects. This is used to deliver the site, keep it secure and limit abuse. Our forms briefly
            count recent requests per IP address in server memory to block spam; it is not stored in a database and
            is discarded within minutes. We do not use analytics or profiling tools of our own.
          </p>
          <h3>Advertising measurement (only if you accept)</h3>
          <p>
            If you press Accept on the cookie notice, we load the Meta Pixel (Facebook and Instagram). It records
            that you visited pages of this site and lets us measure how our ads perform. Meta receives your IP address,
            browser details, the pages you view and identifiers stored in cookies. Meta uses this data under its own
            policies and is a separate controller for its own purposes. Legal basis: your consent. If you decline, or
            never choose, none of this runs.
          </p>
          <h3>Links to other services</h3>
          <p>
            Links to WhatsApp, LinkedIn and email open those services or apps, which then handle your information under
            their own policies. We only receive what you choose to send.
          </p>

          <h2 id="cookies">3. Cookies and similar technologies</h2>
          <p>
            We use as little as possible. No advertising or analytics cookies are set and no tracking requests are made
            before you choose, and declining is as easy as accepting.
          </p>
          <div className="policy__table" role="region" aria-label="Cookies and storage" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Set by</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">When</th>
                  <th scope="col">Lasts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>leadsync-consent-v1</td>
                  <td>This site (browser storage)</td>
                  <td>Remembers your Accept or Decline choice. Strictly necessary, never sent to anyone.</td>
                  <td>When you make a choice</td>
                  <td>Until you clear your browser data</td>
                </tr>
                <tr>
                  <td>_fbp, _fbc</td>
                  <td>Meta</td>
                  <td>Advertising measurement</td>
                  <td>Only after you accept</td>
                  <td>Up to 90 days</td>
                </tr>
                <tr>
                  <td>Calendly cookies</td>
                  <td>Calendly</td>
                  <td>Run the booking scheduler</td>
                  <td>Only at the booking step, after you submit the form</td>
                  <td>Set by Calendly</td>
                </tr>
                <tr>
                  <td>Video player cookies</td>
                  <td>The video provider (YouTube, Vimeo, Loom or Wistia)</td>
                  <td>Play the overview video</td>
                  <td>Only after you press play on the video</td>
                  <td>Set by the provider</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Fonts are served from this site, not from Google. You can change your choice about the Meta Pixel at any time
            with “Cookie settings” in the footer. Choosing Decline stops tracking and removes the Meta cookies this site
            can reach.
          </p>

          <h2 id="share">4. Who we share information with</h2>
          <p>We do not sell personal information. We use these providers to run the site:</p>
          <ul>
            <li><strong>Vercel</strong>: hosts the website and receives technical data when you visit.</li>
            <li><strong>Resend</strong>: sends the form submissions to us by email.</li>
            <li><strong>Calendly</strong>: runs booking, at the booking step only.</li>
            <li><strong>Meta</strong>: only if you accept the advertising cookies.</li>
            <li>
              <strong>Video provider</strong> (such as YouTube, Vimeo, Loom or Wistia): only if you press play on the
              embedded video.
            </li>
          </ul>
          <p>We may also disclose information where the law requires it.</p>

          <h2 id="transfers">5. Where information goes</h2>
          <p>
            We are based in Egypt and our providers are largely in the United States. Using this site and our forms
            therefore involves transferring information internationally. Where the law requires safeguards for such
            transfers (for example for visitors from the UK or EU), we rely on the safeguards our providers offer,
            such as standard contractual clauses.
          </p>

          <h2 id="retention">6. How long we keep it</h2>
          <ul>
            <li>
              Form enquiries sit in our email. If no work follows, we delete them within 12 months. If we work together,
              we keep what the work and our legal obligations need.
            </li>
            <li>Your cookie choice stays in your browser until you clear it.</li>
            <li>Meta, Calendly, Vercel and Resend keep data under their own retention rules.</li>
          </ul>

          <h2 id="rights">7. Your rights</h2>
          <p>
            Depending on where you live, you can ask to see the personal information we hold about you, have it
            corrected or deleted, restrict or object to its use, receive a copy in a portable format, and withdraw
            consent at any time (withdrawing does not affect what happened before). Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will reply within one month. You can also
            complain to your data protection authority: in the UK the Information Commissioner’s Office, in the EU
            your national authority, and in Egypt the Personal Data Protection Centre.
          </p>

          <h2 id="children">8. Children</h2>
          <p>This website is for businesses and is not aimed at anyone under 18. We do not knowingly collect their information.</p>

          <h2 id="security">9. Security</h2>
          <p>
            The site is served over HTTPS, form submissions are validated and limited in size, and spam is filtered.
            No system is perfectly secure, but we keep what we collect to a minimum.
          </p>

          <h2 id="changes">10. Changes to this policy</h2>
          <p>
            If we change what the site does, we will update this page and its date. If we add a new kind of tracking, we
            will ask for your consent again before it runs.
          </p>

          <p className="small">
            Questions? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ·{" "}
            <Link href="/about#contact">Contact form</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
