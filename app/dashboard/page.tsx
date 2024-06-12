import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data'
export default async function Page() {
  const revenue = await fetchRevenue()
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData()
  const latestInvoices = await fetchLatestInvoices()
  console.log("🚀 ~ Page ~ latestInvoices:", latestInvoices)
  // console.log("🚀 ~ Page ~ res:", res)

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        仪表板
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="已收款" value={totalPaidInvoices} type="collected" />
        <Card title="待处理" value={totalPendingInvoices} type="pending" />
        <Card title="总发票数" value={numberOfInvoices} type="invoices" />
        <Card
          title="总客户数"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}