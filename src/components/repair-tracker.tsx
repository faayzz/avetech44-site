"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, CheckCircle2, CircleAlert, Clock3, PackageCheck, Search, Wrench } from "./icons";
import { businessInfo } from "@/lib/site-config";
import type { RepairRecord } from "@/lib/google-repair";

type TrackerProps = {
  initialRecord?: RepairRecord | null;
  initialError?: string;
  initialName?: string;
  initialLocker?: string;
};

const toneIcon = {
  orange: <Wrench size={23} />,
  green: <CheckCircle2 size={23} />,
  red: <CircleAlert size={23} />,
  blue: <PackageCheck size={23} />,
};

export function RepairTracker({ initialRecord = null, initialError = "", initialName = "", initialLocker = "" }: TrackerProps) {
  const [name, setName] = useState(initialName);
  const [locker, setLocker] = useState(initialLocker);
  const [record, setRecord] = useState<RepairRecord | null>(initialRecord);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRecord(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 18000);
    try {
      const response = await fetch("/api/repair-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, locker }), signal: controller.signal });
      const data = await response.json() as { message?: string; record?: RepairRecord };
      if (!response.ok || !data.record) throw new Error(data.message || "Aucune réparation ne correspond à ces informations.");
      setRecord(data.record);
    } catch (caught) {
      setError(caught instanceof DOMException && caught.name === "AbortError" ? "La recherche Google Sheets a dépassé le délai. Vérifiez le partage du document puis réessayez." : caught instanceof Error ? caught.message : "Vérifiez vos informations et réessayez.");
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <div className="tracker-wrap">
      <form className="tracker-form" method="get" action="/suivi" onSubmit={handleSubmit}>
        <div className="tracker-form-heading"><span className="tracker-icon"><Search size={21} /></span><div><p className="eyebrow">Accès sécurisé</p><h2>Retrouver mon dossier</h2></div></div>
        <p className="tracker-intro">Saisissez le nom indiqué lors du dépôt et le numéro de casier remis par l’atelier.</p>
        <label className="field"><span>Nom du client <em>*</em></span><input required name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex. Martin" /></label>
        <label className="field"><span>Numéro de casier <em>*</em></span><input required name="locker" value={locker} onChange={(event) => setLocker(event.target.value)} placeholder="Ex. AT-1042" /></label>
        {error && <p className="form-error tracker-error" role="alert"><CircleAlert size={16} /> {error}</p>}
        <button className="button tracker-button" disabled={loading} type="submit">{loading ? "Recherche en cours…" : "Voir l’avancement"} <ArrowRight size={17} /></button>
        <p className="tracker-privacy">Vos informations servent uniquement à retrouver votre dossier de réparation.</p>
      </form>
      <div className="tracker-result-area">
        {!record && !loading && <div className="tracker-empty"><div className="empty-orbit"><Clock3 size={29} /></div><p className="eyebrow">Suivi en temps réel</p><h3>Votre réparation, en toute clarté.</h3><p>Le statut de votre appareil s’affichera ici dès que votre dossier sera trouvé.</p></div>}
        {loading && <div className="tracker-empty"><div className="loader" /><p className="eyebrow">Connexion à l’atelier</p><h3>Nous cherchons votre dossier…</h3><p>Un instant, nous vérifions les dernières informations disponibles.</p></div>}
        {record && <div className="repair-result" role="status">
          <div className={`result-status result-status-${record.statusTone}`}><span className="result-status-icon">{toneIcon[record.statusTone]}</span><div><span className="result-kicker">Dossier retrouvé · {record.updatedAt}</span><h3>{record.statusLabel}</h3></div></div>
          <div className="result-device"><span>Appareil suivi</span><strong>{record.device}</strong></div>
          <p className="result-detail">{record.detail}</p>
          <div className="repair-timeline">{record.history.map((step, index) => <div className={`timeline-step ${step.done ? "timeline-step-done" : ""} ${step.current ? "timeline-step-current" : ""}`} key={`${step.label}-${index}`}><span className="timeline-marker">{step.done ? <Check size={14} /> : <span />}</span><div><strong>{step.label}</strong><span>{step.date}</span></div></div>)}</div>
          <p className="result-help">Une question sur ce délai ? <a href={businessInfo.phoneHref}>Appelez l’atelier <ArrowRight size={14} /></a></p>
        </div>}
      </div>
    </div>
  );
}
