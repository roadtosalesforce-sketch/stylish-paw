import Link from "next/link";
import {redirect} from "next/navigation";
import {LogOut, PackageCheck, UserRound} from "lucide-react";
import {createClient, getCurrentUser} from "@/lib/supabase/server";
import {getLocale} from "@/i18n/server";
import {signOut} from "./actions";

type Order = {id: string; created_at: string; amount_total: number; currency: string; status: string};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");
  const locale = await getLocale();
  const pl = locale === "pl";
  const supabase = await createClient();
  const {data: orders} = supabase
    ? await supabase.from("orders").select("id, created_at, amount_total, currency, status").order("created_at", {ascending: false})
    : {data: [] as Order[]};
  const name = String(user.user_metadata?.full_name || user.email || "Furry Fairy member");

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 rounded-[2rem] bg-[#e5eee3] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div className="flex items-center gap-4"><span className="rounded-full bg-white p-3 text-sage-dark"><UserRound className="h-7 w-7" /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sage-dark">{pl ? "Moje konto" : "My account"}</p><h1 className="font-display text-3xl font-bold">{name}</h1><p className="text-sm text-stone-600">{user.email}</p></div></div>
        <form action={signOut}><button className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-white px-5 py-2.5 text-sm font-bold hover:border-coral hover:text-coral"><LogOut className="h-4 w-4" />{pl ? "Wyloguj się" : "Sign out"}</button></form>
      </div>
      <div className="mt-10">
        <div className="flex items-center gap-3"><PackageCheck className="h-6 w-6 text-coral" /><h2 className="font-display text-2xl font-bold">{pl ? "Moje zamówienia" : "My orders"}</h2></div>
        {orders?.length ? <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">{(orders as Order[]).map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-5 py-4 last:border-0"><div><p className="font-bold">#{order.id.slice(0, 8).toUpperCase()}</p><p className="text-sm text-stone-500">{new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB").format(new Date(order.created_at))}</p></div><div className="text-right"><p className="font-bold">{new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-GB", {style: "currency", currency: order.currency.toUpperCase()}).format(order.amount_total / 100)}</p><p className="text-xs font-bold uppercase tracking-wide text-sage-dark">{order.status}</p></div></div>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center"><p className="font-bold">{pl ? "Nie masz jeszcze zamówień." : "No orders yet."}</p><p className="mt-2 text-sm text-stone-500">{pl ? "Twoje przyszłe zakupy pojawią się tutaj." : "Your future purchases will appear here."}</p><Link href="/shop" className="mt-5 inline-block rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white">{pl ? "Przejdź do sklepu" : "Shop now"}</Link></div>}
      </div>
    </section>
  );
}
