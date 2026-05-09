"use client";

import { useState, useTransition, useEffect } from "react";
import { upsertSiteContactInfo } from "@/lib/actions/siteContact";
import type { SiteContactInfo } from "../../../generated/prisma-client";
import {
  Mail, MapPin, Phone, Linkedin, Youtube, Instagram, Globe,
  Save, CheckCircle, Loader2, Music2, Facebook,
} from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

type Props = { info: SiteContactInfo | null };

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-leaf/50";

function Field({
  label, name, defaultValue, icon: Icon, placeholder, type = "text",
}: {
  label: string; name: string; defaultValue: string; icon: React.ElementType;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
        <Icon className="w-3.5 h-3.5 text-leaf-bright" />
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

function TextAreaField({
  label, name, defaultValue, icon: Icon, placeholder,
}: {
  label: string; name: string; defaultValue: string; icon: React.ElementType; placeholder?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
        <Icon className="w-3.5 h-3.5 text-leaf-bright" />
        {label}
      </label>
      <textarea
        name={name}
        rows={2}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${inputCls} resize-none`}
      />
    </div>
  );
}

export default function ContactInfoCrud({ info }: Props) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const v = (key: keyof SiteContactInfo, fallback: string) =>
    (info?.[key] as string | null | undefined) || fallback;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const res = await upsertSiteContactInfo(fd);
        if (res.success) setSaved(true);
      } catch (err) {
        console.error(err);
        setError("Failed to save. Please try again.");
      }
    });
  }

  return (
    <form key={info?.updatedAt?.toString() || "new"} onSubmit={handleSubmit} className="space-y-8">
      {/* Emails */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <Mail className="w-5 h-5 text-leaf-bright" /> Institutional Emails
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="General Enquiries"     name="generalEmail"  icon={Mail} type="email"
            defaultValue={v("generalEmail", "info@circularcoffee.org")} />
          <Field label="Research Collaboration" name="researchEmail" icon={Mail} type="email"
            defaultValue={v("researchEmail", "research@circularcoffee.org")} />
          <Field label="Media & Communications" name="mediaEmail"    icon={Mail} type="email"
            defaultValue={v("mediaEmail", "media@circularcoffee.org")} />
        </div>
      </div>

      {/* Phone numbers */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <Phone className="w-5 h-5 text-leaf-bright" /> Phone Numbers
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary Phone" name="primaryPhone" icon={Phone} type="tel"
            defaultValue={v("primaryPhone", "")} placeholder="+251 11 000 0000" />
          <Field label="Secondary Phone" name="secondaryPhone" icon={Phone} type="tel"
            defaultValue={v("secondaryPhone", "")} placeholder="+32 3 000 0000" />
        </div>
      </div>

      {/* Locations */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-leaf-bright" /> Office Locations
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextAreaField label="University of Antwerp" name="northLocation" icon={MapPin}
            defaultValue={v("northLocation", "Prinsstraat 13, 2000 Antwerp, Belgium")} />
          <TextAreaField label="CTBE-AAU" name="southLocation" icon={MapPin}
            defaultValue={v("southLocation", "King George VI Street, Addis Ababa, Ethiopia")} />
        </div>
      </div>

      {/* Social media */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <Globe className="w-5 h-5 text-leaf-bright" /> Social Media & Web
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="LinkedIn"   name="linkedin"  icon={Linkedin}  defaultValue={v("linkedin", "")}  placeholder="https://linkedin.com/company/..." />
          <Field label="YouTube"    name="youtube"   icon={Youtube}   defaultValue={v("youtube", "")}   placeholder="https://youtube.com/@..." />
          <Field label="X (Twitter)" name="twitter"  icon={XIcon}     defaultValue={v("twitter", "")}   placeholder="https://x.com/..." />
          <Field label="Facebook"   name="facebook"  icon={Facebook}  defaultValue={v("facebook", "")}  placeholder="https://facebook.com/..." />
          <Field label="Instagram"  name="instagram" icon={Instagram} defaultValue={v("instagram", "")} placeholder="https://instagram.com/..." />
          <Field label="TikTok"     name="tiktok"    icon={Music2}    defaultValue={v("tiktok", "")}    placeholder="https://tiktok.com/@..." />
          <Field label="Website"    name="website"   icon={Globe}     defaultValue={v("website", "")}   placeholder="https://circularcoffee.org" />
        </div>
      </div>

      {error && (
        <p className="text-sm text-rose-400 bg-rose-400/10 rounded-xl px-4 py-3">{error}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {pending ? "Saving…" : "Save Changes"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-leaf-bright text-sm font-medium animate-fade-in-up">
            <CheckCircle className="w-4 h-4" /> Saved successfully!
          </span>
        )}
      </div>
    </form>
  );
}
