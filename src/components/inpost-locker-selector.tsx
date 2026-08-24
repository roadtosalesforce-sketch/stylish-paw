"use client";

import Script from "next/script";
import {MapPin, PackageCheck} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import type {Dictionary, Locale} from "@/i18n/dictionaries";

type PointDetails = {
  name?: string;
  address?: {line1?: string; line2?: string};
  address_details?: {
    street?: string;
    building_number?: string;
    city?: string;
    post_code?: string;
  };
};

type InPostPointEvent = Event & {
  detail?: PointDetails;
  details?: PointDetails;
};

function pointAddress(point: PointDetails) {
  if (point.address?.line1 || point.address?.line2) {
    return [point.address.line1, point.address.line2].filter(Boolean).join(", ");
  }

  const details = point.address_details;
  if (!details) return "";
  const street = [details.street, details.building_number].filter(Boolean).join(" ");
  const city = [details.post_code, details.city].filter(Boolean).join(" ");
  return [street, city].filter(Boolean).join(", ");
}

export function InPostLockerSelector({
  locale,
  dict,
  token,
  value,
  address,
  shippingLabel,
  onChange,
}: {
  locale: Locale;
  dict: Dictionary;
  token?: string;
  value: string;
  address: string;
  shippingLabel: string;
  onChange: (point: {name: string; address: string}) => void;
}) {
  const [showMap, setShowMap] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const widgetContainer = useRef<HTMLDivElement>(null);

  const mountWidget = useCallback(() => {
    if (!token || !showMap || !scriptReady || !widgetContainer.current) return;

    const widget = document.createElement("inpost-geowidget");
    widget.setAttribute("onpoint", "onpointselect");
    widget.setAttribute("token", token);
    widget.setAttribute("language", locale);
    widget.setAttribute("config", "parcelCollectInPost");
    widgetContainer.current.replaceChildren(widget);
  }, [locale, scriptReady, showMap, token]);

  useEffect(() => {
    if (!token) return;
    const handlePoint = (event: Event) => {
      const pointEvent = event as InPostPointEvent;
      const point = pointEvent.detail || pointEvent.details;
      if (!point?.name) return;
      onChange({name: point.name.toUpperCase(), address: pointAddress(point)});
      setShowMap(false);
    };

    document.addEventListener("onpointselect", handlePoint);
    return () => document.removeEventListener("onpointselect", handlePoint);
  }, [onChange, token]);

  useEffect(() => {
    mountWidget();
  }, [mountWidget]);

  return (
    <section className="mt-5 rounded-2xl bg-[#f7f2ea] p-4 ring-1 ring-stone-200">
      {token ? (
        <>
          <link rel="stylesheet" href="https://geowidget.inpost.pl/inpost-geowidget.css" />
          <Script
            id="inpost-geowidget"
            src="https://geowidget.inpost.pl/inpost-geowidget.js"
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
            onReady={() => setScriptReady(true)}
          />
        </>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffdf00] text-charcoal">
            <PackageCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-charcoal">InPost Paczkomat® 24/7</h3>
            <p className="mt-0.5 text-xs text-stone-500">{dict.cart.inpostEta}</p>
          </div>
        </div>
        <strong className="shrink-0 text-sm text-charcoal">{shippingLabel}</strong>
      </div>

      {value ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 ring-1 ring-sage/30">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-sage-dark">{dict.cart.selectedLocker}</p>
            <p className="mt-0.5 text-sm font-extrabold text-charcoal">{value}</p>
            {address ? <p className="mt-0.5 text-xs text-stone-500">{address}</p> : null}
          </div>
        </div>
      ) : null}

      {token ? (
        <>
          <button
            type="button"
            onClick={() => setShowMap((current) => !current)}
            className="mt-4 w-full rounded-full border border-charcoal/15 bg-white px-4 py-2.5 text-sm font-bold text-charcoal transition hover:border-coral hover:text-coral"
          >
            {value ? dict.cart.changeLocker : dict.cart.chooseLocker}
          </button>
          {showMap ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white ring-1 ring-stone-200">
              <div ref={widgetContainer} className="min-h-[390px]" />
            </div>
          ) : null}
        </>
      ) : null}

      <label className="mt-4 block text-xs font-bold text-charcoal" htmlFor="inpost-locker-code">
        {token ? dict.cart.lockerCodeAlternative : dict.cart.lockerCode}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="inpost-locker-code"
          value={value}
          onChange={(event) =>
            onChange({
              name: event.target.value.toUpperCase().replace(/\s/g, ""),
              address: "",
            })
          }
          placeholder={dict.cart.lockerPlaceholder}
          maxLength={20}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-bold uppercase text-charcoal outline-none transition placeholder:font-normal placeholder:normal-case placeholder:text-stone-400 focus:border-coral focus:ring-2 focus:ring-coral/15"
        />
        <a
          href="https://inpost.pl/znajdz-paczkomat"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center rounded-xl bg-charcoal px-3 py-2 text-center text-xs font-bold text-white transition hover:bg-coral"
        >
          {dict.cart.findLocker}
        </a>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-stone-500">{dict.cart.lockerHint}</p>
    </section>
  );
}
