import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

// NOTE: Draft for legal review (see PROVIDE.md). Describes how this website behaves today.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[Date of legal review]">
      <p>
        This policy explains how {site.legalName} (&quot;Ciylo&quot;, &quot;we&quot;) handles information when you visit
        this website or contact us.
      </p>
      <h2>Information you send us</h2>
      <p>
        When you use our contact form, your email application opens with a pre-filled message addressed to {site.email}.
        We receive only what you choose to send, such as your name, email address, phone number, company and project
        details. We use it to reply to you, scope work and manage our relationship with you.
      </p>
      <h2>Information collected automatically</h2>
      <p>
        Our hosting provider may record standard technical logs (such as IP address, browser type and pages requested) to
        keep the site secure and reliable. This website does not use advertising cookies. [Update this section if
        analytics are added.]
      </p>
      <h2>Sharing</h2>
      <p>
        We do not sell your information. We share it only with service providers who help us operate our business (for
        example email and hosting), or when required by law.
      </p>
      <h2>Retention and your rights</h2>
      <p>
        We keep enquiry emails for as long as needed to respond and maintain business records. You can ask us to access,
        correct or delete your information at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.city} {site.address.postalCode}, {site.address.country}.{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
