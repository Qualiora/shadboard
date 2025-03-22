import type { UserType } from "../../../types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChangePasswordForm } from "./chnage-password-form"

export function ChangePassword({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure. Choose a strong,
          unique password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm user={user} />
      </CardContent>
    </Card>
  )
}
