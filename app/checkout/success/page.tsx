"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      // In a real app, you'd fetch the order details here
      // For now, we'll just show the order ID
    }
  }, [orderId])

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
          <div>
            <h1 className="mb-2 text-3xl font-bold">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">Thank you for your purchase</p>
          </div>

          {orderId && (
            <div className="w-full rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm font-semibold">{orderId}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            You will receive an email confirmation shortly with your order details.
          </p>

          <div className="flex w-full flex-col gap-2">
            <Link href="/products" className="w-full">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
