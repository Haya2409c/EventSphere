import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const initialProducts = [
  {
    id: 1,
    name: 'CloudMesh Edge Gateway',
    category: 'IoT & Hardware',
    price: '$1,250',
    desc: 'Low-latency industrial telemetry gateway for smart manufacturing floors.',
    image: '',
  },
  {
    id: 2,
    name: 'PulseOps Analytics Suite',
    category: 'Enterprise SaaS',
    price: '$490/mo',
    desc: 'Real-time operational observability and automated anomaly alerts.',
    image: '',
  },
];

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: 'TechNova Solutions',
    tagline: 'Enterprise cloud & connected floor infrastructure',
    email: 'hello@technova.io',
    phone: '+1 (415) 890-4421',
    website: 'https://technova.io',
    description:
      'We build resilient cloud-native platforms and smart exhibition telemetry tools for fast-growing enterprises.',
    logo: '',
  });

  const [products, setProducts] = useState(initialProducts);
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    category: 'Enterprise SaaS',
    price: '',
    desc: '',
    image: '',
  });
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const checklist = [
    { label: 'Company name & overview', done: Boolean(company.name.trim() && company.description.trim()) },
    { label: 'Brand logo uploaded', done: Boolean(company.logo) },
    { label: 'Website & contact info', done: Boolean(company.website.trim() && company.email.trim()) },
    { label: 'At least 1 showcase product', done: products.length > 0 },
  ];
  const completionPercent = Math.round(
    (checklist.filter((item) => item.done).length / checklist.length) * 100
  );
  const remainingTasks = checklist.filter((item) => !item.done);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCompany((prev) => ({ ...prev, logo: url }));
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProductForm((prev) => ({ ...prev, image: url }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    showToast('Company profile saved & synced with public listing');
  };

  const openAddProduct = () => {
    setProductForm({ id: null, name: '', category: 'Enterprise SaaS', price: '', desc: '', image: '' });
    setIsEditingProduct(false);
    setShowProductForm(true);
  };

  const openEditProduct = (item) => {
    setProductForm(item);
    setIsEditingProduct(true);
    setShowProductForm(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    if (isEditingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === productForm.id ? productForm : p)));
      showToast('Product updated');
    } else {
      setProducts((prev) => [...prev, { ...productForm, id: Date.now() }]);
      showToast('New product added to showcase');
    }
    setShowProductForm(false);
  };

  const confirmDeleteProduct = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast('Product removed');
  };

  const inputClass =
    'w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-[#192334] placeholder:text-[#687078] outline-none transition duration-200 focus:border-[#192334] focus:bg-white focus:ring-[3px] focus:ring-[#192334]/10';

  return (
    <div className="space-y-6 pb-12">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#e2bd82]/30 bg-[#192334] px-5 py-3 text-xs font-semibold text-[#e2bd82] shadow-xl"
        >
          ✓ {toast}
        </div>
      )}

      {/* Compact Hero + Actionable Completeness Strip */}
      <ScrollReveal y={20}>
        <div className="grid w-full grid-cols-1 items-start gap-6 rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="min-w-0">
            <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
              Exhibitor Identity
            </span>
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Company Profile &amp;{' '}
              <span className="font-serif italic text-[#e2bd82]">Showcase Catalog</span>
            </h2>
            <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">
              Manage your public brand presence, contact desk, and booth product lineup.
            </p>
          </div>

          {/* Compact Completeness Panel */}
          <div className="w-full self-stretch rounded-xl border border-white/15 bg-white/[0.08] p-4 lg:w-[320px] lg:self-auto">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-slate-200">Profile Completeness</span>
              <span className="shrink-0 text-[#e2bd82]">{completionPercent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.15] ring-1 ring-inset ring-white/10">
              <div
                style={{ width: `${completionPercent}%` }}
                className="h-full rounded-full bg-[#e2bd82] transition-all duration-300"
              />
            </div>

            {remainingTasks.length === 0 ? (
              <p className="mt-3 text-xs font-medium leading-5 text-[#e2bd82]">
                All profile essentials complete — ready for attendees.
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {remainingTasks.map((task) => (
                  <span
                    key={task.label}
                    className="rounded-md bg-white/10 px-2 py-1 text-[11px] leading-4 text-slate-200"
                  >
                    + {task.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Main Grid: Sectioned Form (8 cols) + Realistic Exhibitor Card Preview (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <ScrollReveal y={24} className="lg:col-span-8">
          <form
            onSubmit={handleSaveProfile}
            className="rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.05)] space-y-7"
          >
            {/* Section 1: Square Logo & Core Brand */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#efefeb] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  01 • Brand & Logo
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Proper Square Logo Upload Box */}
                <label className="group relative h-24 w-24 shrink-0 cursor-pointer rounded-2xl border border-dashed border-[#c9bea9] bg-[#fafaf8] flex items-center justify-center overflow-hidden transition hover:border-[#192334] hover:bg-[#f3f0e9]">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt="Company logo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-2">
                      <span className="block text-lg font-bold text-[#192334]">
                        {company.name.charAt(0)}
                      </span>
                      <span className="block text-[10px] font-semibold text-[#525b65] mt-0.5">
                        Square Logo
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>

                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={company.name}
                      onChange={(e) => setCompany({ ...company, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-[#687078]">
                      Square 1:1 image (PNG, JPG, SVG) • Click box to change
                    </span>
                    {company.logo && (
                      <button
                        type="button"
                        onClick={() => setCompany({ ...company, logo: '' })}
                        className="text-[11px] font-semibold text-red-600 hover:underline"
                      >
                        Remove logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={company.tagline}
                  onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                  Company Overview
                </label>
                <textarea
                  rows={3}
                  value={company.description}
                  onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Section 2: Contact & Links */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-[#efefeb] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  02 • Contact & Digital Presence
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Phone / Desk
                  </label>
                  <input
                    type="text"
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-[#efefeb] pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#192334] px-6 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a] focus:outline-none focus:ring-[3px] focus:ring-[#192334]/20 disabled:opacity-60"
              >
                {saving ? 'Saving Changes...' : 'Save Company Profile'}
              </button>
            </div>
          </form>
        </ScrollReveal>

        {/* Realistic Exhibitor Card Preview (Full Hierarchy, No Clipping) */}
        <ScrollReveal y={24} delay={0.08} className="lg:col-span-4">
          <div className="rounded-2xl border border-[#e6e5e0] bg-[#f3f0e9]/80 p-5 shadow-[0_8px_28px_rgba(25,35,52,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                Exhibitor Card Preview
              </span>
              <span className="rounded-full bg-[#192334] px-2.5 py-0.5 text-[10px] font-semibold text-[#e2bd82]">
                Booth A12
              </span>
            </div>

            <div className="rounded-2xl border border-[#e2bd82]/60 bg-[#192334] p-5 text-white shadow-md space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="h-12 w-12 rounded-xl bg-[#e2bd82] text-[#192334] font-bold text-base flex items-center justify-center overflow-hidden shrink-0">
                  {company.logo ? (
                    <img src={company.logo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    company.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white leading-snug">
                    {company.name}
                  </h4>
                  <p className="text-xs text-[#e2bd82] mt-0.5 leading-snug">
                    {company.tagline}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-300">
                {company.description}
              </p>

              <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-[11px] text-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">Email:</span>
                  <span className="min-w-0 break-all text-right font-medium text-white">{company.email}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-400">Website:</span>
                  <span className="min-w-0 break-all text-right font-medium text-[#e2bd82]">{company.website}</span>
                </div>
              </div>

              {/* Featured Product Pills */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Showcase Lineup ({products.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {products.map((prod) => (
                    <span
                      key={prod.id}
                      className="rounded-lg bg-white/10 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white"
                    >
                      {prod.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Section 3: Products & Solutions */}
      <ScrollReveal y={24}>
        <section className="rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                03 • Product Catalog
              </p>
              <h3 className="text-xl font-semibold text-[#192334] mt-0.5">
                Featured Products & Solutions
              </h3>
            </div>
            <button
              type="button"
              onClick={openAddProduct}
              className="rounded-xl bg-[#192334] px-4 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a]"
            >
              + Add Product
            </button>
          </div>

          {showProductForm && (
            <form
              onSubmit={handleSaveProduct}
              className="mb-6 rounded-2xl border border-[#e2bd82] bg-[#f3f0e9]/70 p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#192334]">
                  {isEditingProduct ? 'Edit Product' : 'Add New Product'}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  className="text-xs font-semibold text-[#525b65] hover:text-[#192334]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Product name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="rounded-xl border border-[#e6e5e0] bg-white px-3.5 py-2.5 text-sm text-[#192334] outline-none transition focus:border-[#192334] focus:ring-[3px] focus:ring-[#192334]/10"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. AI & Cloud)"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="rounded-xl border border-[#e6e5e0] bg-white px-3.5 py-2.5 text-sm text-[#192334] outline-none transition focus:border-[#192334] focus:ring-[3px] focus:ring-[#192334]/10"
                />
                <input
                  type="text"
                  placeholder="Price or Tier (e.g. $990)"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="rounded-xl border border-[#e6e5e0] bg-white px-3.5 py-2.5 text-sm text-[#192334] outline-none transition focus:border-[#192334] focus:ring-[3px] focus:ring-[#192334]/10"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Short product description..."
                value={productForm.desc}
                onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
                className="w-full rounded-xl border border-[#e6e5e0] bg-white px-3.5 py-2.5 text-sm text-[#192334] outline-none transition focus:border-[#192334] focus:ring-[3px] focus:ring-[#192334]/10"
              />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {productForm.image && (
                    <img
                      src={productForm.image}
                      alt=""
                      className="h-11 w-11 rounded-lg object-cover border border-[#e6e5e0]"
                    />
                  )}
                  <label className="cursor-pointer rounded-xl border border-[#e6e5e0] bg-white px-3.5 py-2 text-xs font-semibold text-[#192334] transition hover:border-[#192334]">
                    Product Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-[#192334] px-5 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a]"
                >
                  {isEditingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          )}

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-[#fafaf8] py-10 text-center">
              <p className="text-sm font-semibold text-[#192334]">No products added yet</p>
              <p className="mt-1 text-xs text-[#687078]">
                Add your flagship offerings so visitors know what to explore at your booth.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#e6e5e0] bg-[#fafaf8] p-5 flex flex-col justify-between gap-4 transition duration-200 hover:border-[#192334]/30 hover:bg-white hover:shadow-[0_6px_18px_rgba(25,35,52,0.05)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-[#192334] text-[#e2bd82] flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold tracking-wider">PRO</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#f3f0e9] border border-[#e2bd82]/50 px-2.5 py-0.5 text-[10px] font-semibold text-[#7a5f35]">
                          {item.category}
                        </span>
                        {item.price && (
                          <span className="text-xs font-bold text-[#192334]">{item.price}</span>
                        )}
                      </div>
                      <h4 className="mt-1.5 text-base font-semibold text-[#192334]">{item.name}</h4>
                      <p className="mt-1 text-xs leading-5 text-[#525b65]">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e6e5e0]">
                    <button
                      type="button"
                      onClick={() => openEditProduct(item)}
                      className="rounded-lg border border-[#e6e5e0] bg-white px-3 py-1.5 text-xs font-semibold text-[#192334] transition hover:border-[#192334]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/55 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-xl">
            <h4 className="text-base font-semibold text-[#192334]">Delete "{deleteTarget.name}"?</h4>
            <p className="mt-2 text-xs leading-5 text-[#525b65]">
              This product will be removed from your exhibitor showcase. You can add it again anytime.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-[#e6e5e0] px-4 py-2 text-xs font-semibold text-[#192334]"
              >
                Keep
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;