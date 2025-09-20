import React from "react"

type Props = {
  // You can pass subscription info or user profile if needed
  profileName?: string
}

const Page: React.FC<Props> = ({ profileName }) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Subscription Billing</h1>
        <p className="mt-2 text-gray-600">
          {profileName
            ? `Manage billing for ${profileName}`
            : "Loading your subscription details..."}
        </p>
        {/* TODO: Add subscription billing logic here */}
      </div>
    </section>
  )
}

export default Page
