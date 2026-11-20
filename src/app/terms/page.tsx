import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Ciylo website, including intellectual property, acceptable use, liability and how to contact Ciylo.",
  alternates: { canonical: "/terms" },
};

// NOTE: Draft for legal review (see PROVIDE.md). Covers use of this website only;
// client engagements are governed by their own signed agreements.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="[Date of legal review]">
      <p>
        These terms govern your use of this website, operated by {site.legalName}. By using the site you agree to them.
      </p>
      <h2>Use of the site</h2>
      <p>
        You may browse and share content from this site for personal or internal business purposes. Do not misuse the site,
        attempt to disrupt it or access it in ways it was not designed for.
      </p>
      <h2>Content and trademarks</h2>
      <p>
        The Ciylo name, logo and site content belong to Ciylo. Client names, logos and product screenshots appear with
        permission and remain the property of their owners.
      </p>
      <h2>Projects and services</h2>
      <p>
        Information on this site describes our capabilities and is not an offer. Any engagement is governed by a separate
        written agreement (for example an NDA, MSA or statement of work) signed by both parties.
      </p>
      <h2>No warranty</h2>
      <p>
        The site is provided &quot;as is&quot;. We work to keep it accurate but do not guarantee that all content is complete
        or current, and we are not liable for losses arising from its use, to the extent permitted by law.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [jurisdiction to be confirmed].</p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
