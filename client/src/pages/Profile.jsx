import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Trash2, Check, Mail, Phone, MapPin, Calendar, GraduationCap, Target, Save, RotateCcw } from "lucide-react";
import UserAvatar from "../components/UserAvatar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useLevel } from "../context/LevelContext.jsx";

const FIELDS = ["name", "email", "gender", "photoUrl", "phone", "dob", "city", "education", "institution", "targetExam", "bio", "dailyGoal"];

const EDUCATION = ["School (up to Class 10)", "Higher Secondary (Class 11-12)", "Diploma", "Undergraduate", "Postgraduate", "Working Professional", "Other"];
const EXAMS = {
  foundation: ["School exams", "Competitive aptitude", "Campus placements", "Bank / SSC exams", "Just improving skills"],
  upsc: ["UPSC Civil Services (CSE)", "UPSC CAPF", "State PSC", "UPSC ESE / CDS / NDA", "Other"],
};

// Resize + centre-crop to a small square JPEG so it stores cheaply
const fileToAvatar = (file, size = 320) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      canvas.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = url;
  });

// Defined outside Profile so inputs keep focus while typing
function Section({ T, title, icon: Icon, children }) {
  return (
    <div className={`${T.card} p-6 sm:p-8`}>
      <h2 className={`flex items-center gap-2 text-xl mb-6 ${T.heading}`}>
        <Icon size={20} style={{ color: T.accent }} /> {title}
      </h2>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

export default function Profile() {
  const { user, updateProfile, error, clearError } = useAuth();
  const { level } = useLevel();
  const isUpsc = level === "upsc";
  const fileRef = useRef(null);

  const initial = useMemo(() => {
    const o = {};
    FIELDS.forEach((f) => (o[f] = user?.[f] ?? (f === "dailyGoal" ? 10 : "")));
    return o;
  }, [user]);

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [photoErr, setPhotoErr] = useState("");

  useEffect(() => setForm(initial), [initial]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const dirty = FIELDS.some((f) => String(form[f]) !== String(initial[f]));
  const set = (k, v) => {
    if (error) clearError();
    setForm((f) => ({ ...f, [k]: v }));
  };

  const completeness = useMemo(() => {
    const keys = ["name", "email", "photoUrl", "phone", "gender", "dob", "city", "education", "institution", "targetExam", "bio"];
    return Math.round((keys.filter((k) => String(form[k] || "").trim()).length / keys.length) * 100);
  }, [form]);

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPhotoErr("");
    if (!file.type.startsWith("image/")) return setPhotoErr("Please choose an image file.");
    if (file.size > 10 * 1024 * 1024) return setPhotoErr("Image is too large (max 10 MB).");
    try {
      set("photoUrl", await fileToAvatar(file));
    } catch (err) {
      setPhotoErr(err.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ ...form, dailyGoal: Number(form.dailyGoal) });
      setToast("Profile saved successfully");
    } catch {
      /* error shown from context */
    } finally {
      setSaving(false);
    }
  };

  /* ---------- theme ---------- */
  const T = isUpsc
    ? {
        page: "bg-[#f7f5ef]",
        cover: "bg-gradient-to-r from-[#0b1530] to-[#1a2f63]",
        heading: "font-serif text-[#0b1530]",
        card: "bg-white border border-slate-200 rounded-lg shadow-sm",
        input: "w-full px-4 py-3 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a24b] focus:border-[#c9a24b]",
        primary: "bg-[#0b1530] text-white hover:bg-[#14264f] rounded-md",
        accent: "#c9a24b",
        bar: "bg-[#c9a24b]",
        chip: "text-[#0b1530]",
      }
    : {
        page: "bg-gradient-to-b from-violet-50 via-white to-pink-50 font-rounded",
        cover: "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400",
        heading: "font-black text-slate-800",
        card: "bg-white border-2 border-violet-100 rounded-3xl shadow-lg",
        input: "w-full px-4 py-3 border-2 border-violet-100 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400",
        primary: "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:brightness-110 rounded-xl",
        accent: "#8b5cf6",
        bar: "bg-gradient-to-r from-violet-500 to-pink-500",
        chip: "text-violet-700",
      };

  const label = "block text-sm font-semibold text-slate-700 mb-1.5";
  const since = user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "";

  return (
    <div className={`min-h-screen ${T.page}`}>
      {/* Cover + identity */}
      <div className={`${T.cover} h-40 sm:h-48`} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20">
        <div className={`${T.card} p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-6`}>
          <div className="relative -mt-20 sm:-mt-24 shrink-0">
            <UserAvatar user={{ ...user, photoUrl: form.photoUrl, name: form.name }} size={132} ring="ring-4 ring-white shadow-xl" />
            <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-1 right-1 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition" style={{ background: T.accent }} title="Change photo">
              <Camera size={18} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
          </div>
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h1 className={`text-3xl truncate ${T.heading}`}>{form.name || "Your name"}</h1>
            <p className="text-slate-500 truncate">{form.email}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-bold">
              <span className={`px-3 py-1 rounded-full bg-slate-100 ${T.chip}`}>{isUpsc ? "High Level · UPSC" : "Foundation Level"}</span>
              {since && <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">Member since {since}</span>}
            </div>
            {form.photoUrl && (
              <button type="button" onClick={() => set("photoUrl", "")} className="mt-3 inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-semibold">
                <Trash2 size={14} /> Remove photo
              </button>
            )}
            {photoErr && <p className="text-sm text-red-600 mt-2">{photoErr}</p>}
          </div>
          <div className="w-full sm:w-56">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Profile complete</span>
              <span style={{ color: T.accent }}>{completeness}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div className={`h-full rounded-full ${T.bar}`} animate={{ width: `${completeness}%` }} />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6 py-8 pb-28">
          <Section T={T} title="Personal information" icon={Mail}>
            <div>
              <label className={label}>Full name</label>
              <input className={T.input} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" required />
            </div>
            <div>
              <label className={label}>Email</label>
              <input type="email" className={T.input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className={label}><Phone size={13} className="inline mr-1" />Phone</label>
              <input type="tel" className={T.input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className={label}>Gender</label>
              <select className={T.input} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={label}><Calendar size={13} className="inline mr-1" />Date of birth</label>
              <input type="date" className={T.input} value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => set("dob", e.target.value)} />
            </div>
            <div>
              <label className={label}><MapPin size={13} className="inline mr-1" />City</label>
              <input className={T.input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Bengaluru" />
            </div>
          </Section>

          <Section T={T} title="Education & goals" icon={GraduationCap}>
            <div>
              <label className={label}>Education level</label>
              <select className={T.input} value={form.education} onChange={(e) => set("education", e.target.value)}>
                <option value="">Select…</option>
                {EDUCATION.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>School / College / Organisation</label>
              <input className={T.input} value={form.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Where do you study or work?" />
            </div>
            <div>
              <label className={label}><Target size={13} className="inline mr-1" />Preparing for</label>
              <select className={T.input} value={form.targetExam} onChange={(e) => set("targetExam", e.target.value)}>
                <option value="">Select…</option>
                {EXAMS[isUpsc ? "upsc" : "foundation"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Daily goal: <b style={{ color: T.accent }}>{form.dailyGoal} questions</b></label>
              <input type="range" min={5} max={100} step={5} value={form.dailyGoal} onChange={(e) => set("dailyGoal", e.target.value)} className="w-full mt-3" style={{ accentColor: T.accent }} />
              <div className="flex justify-between text-xs text-slate-400"><span>5</span><span>100</span></div>
            </div>
          </Section>

          <div className={`${T.card} p-6 sm:p-8`}>
            <h2 className={`text-xl mb-4 ${T.heading}`}>About you</h2>
            <textarea rows={4} maxLength={300} className={T.input} value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder="A short bio, your study goals, favourite subjects…" />
            <p className="text-right text-xs text-slate-400 mt-1">{form.bio.length}/300</p>
          </div>

          {error && <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}

          {/* Sticky save bar */}
          <AnimatePresence>
            {dirty && (
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-600">You have unsaved changes</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setForm(initial)} className="px-5 py-2.5 rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                      <RotateCcw size={15} /> Discard
                    </button>
                    <button type="submit" disabled={saving} className={`px-6 py-2.5 font-bold flex items-center gap-2 disabled:opacity-60 ${T.primary}`}>
                      <Save size={15} /> {saving ? "Saving…" : "Save changes"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 font-semibold">
            <Check size={18} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
