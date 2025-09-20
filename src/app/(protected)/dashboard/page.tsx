import { SubscriptionEntitlementQuery } from "@/convex/query.config"
import { combinedSlug } from "@/lib/utils"
import { redirect } from "next/navigation"

const Page = async () => {
  const { entitlement, profileName } = await SubscriptionEntitlementQuery()

  if (!entitlement?._valueJSON) {
    // 🚀 No active subscription → send to billing
    redirect(`/billing/${combinedSlug(profileName!)}`)
  }

  // ✅ Active subscription → send to dashboard
  redirect(`/dashboard/${combinedSlug(profileName!)}`)
}

export default Page
