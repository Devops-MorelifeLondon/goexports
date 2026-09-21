import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogSlugs,
  getRelatedBlogs,
  BlogPost,
} from "@/lib/blogs";
import BlogContent from "@/components/blog/BlogContent";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import BlogShareBar from "@/components/blog/BlogShareBar";
import {
  Clock,
  Calendar,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Building2,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Award,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

// ─── SSG Static Params ───
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic SEO Metadata ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | GoExports Knowledge Hub",
      description: "The requested trade guide could not be found.",
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.introduction.slice(0, 160);
  const url = `${BASE_URL}/blog/${post.slug}`;
  const keywords = [
    post.primaryKeyword,
    ...post.secondaryKeywords,
    post.category,
    "GoExports",
    "international trade",
    "export compliance",
  ];

  return {
    title: `${title} | GoExports`,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url,
      siteName: "GoExports - Global Trade Platform",
      type: "article",
      locale: "en_US",
      publishedTime: "2026-02-15T00:00:00.000Z",
      authors: ["GoExports Trade Advisory Desk"],
      tags: keywords,
      images: [
        {
          url: `${BASE_URL}/assets/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || title,
      description: post.ogDescription || description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large" as const,
      "max-video-preview": -1,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(post.slug, post.category, 3);

  // ─── JSON-LD Structured Data ───
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.introduction.slice(0, 160),
    url: `${BASE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    datePublished: "2026-02-15T08:00:00+00:00",
    dateModified: "2026-02-20T12:00:00+00:00",
    author: {
      "@type": "Organization",
      name: "GoExports Trade Advisory Desk",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "GoExports",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo/logo.png`,
      },
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Structured Data Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Top Utility Sub-Header ── */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">GoExports Trade Desk</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">
              {post.category} &bull; Verified Compliance Guide
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#6A6A6A]">
            <span>International Trade Advisory</span>
            <span className="text-[#D0C8B8]">|</span>
            <Link href="/blog" className="text-amber-800 font-bold hover:underline no-underline">
              All 31 Guides →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Breadcrumb" className="border-b border-[#EAE5D9] bg-white/70 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs text-[#767676] sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-[#0A0A0A]">
            Home
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href="/blog" className="transition hover:text-[#0A0A0A]">
            Blog
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <span className="text-[#C5BFA9] hidden sm:inline">{post.category}</span>
          <span className="text-[#C5BFA9] hidden sm:inline">/</span>
          <span className="font-semibold text-[#0A0A0A] truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </div>
      </nav>

      {/* ── Article Header Banner ── */}
      <header className="border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--surface-soft)] to-[var(--canvas)] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Metadata pill row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              {post.category}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-medium">
              <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>{post.readTimeMinutes} min read</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>{post.publishedDate}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              <Award className="w-3 h-3 text-emerald-600" />
              <span>Peer-Reviewed</span>
            </div>
          </div>

          {/* H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--ink)] leading-[1.2] m-0 max-w-5xl">
            {post.title}
          </h1>

          {/* Intro callout / Executive summary */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] max-w-5xl shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="min-w-0 space-y-2">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                  Executive Brief &amp; Strategic Context
                </span>
                <p className="text-[15px] sm:text-[16px] text-[var(--body-strong)] leading-relaxed m-0 font-medium">
                  {post.introduction}
                </p>
              </div>
            </div>
          </div>

          {/* Share & Author bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[var(--hairline)]/80 max-w-5xl">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-[var(--ink)] shadow-2xs shrink-0"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                GE
              </div>
              <div>
                <span className="block text-xs font-bold text-[var(--ink)]">
                  {post.author.name}
                </span>
                <span className="block text-[11px] text-[var(--muted)]">
                  {post.author.role}
                </span>
              </div>
            </div>

            <BlogShareBar title={post.title} url={`${BASE_URL}/blog/${post.slug}`} />
          </div>
        </div>
      </header>

      {/* ── Main Two-Column Layout ── */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Left / Main Content Column (8 cols on desktop) ── */}
          <article className="lg:col-span-8 space-y-8">
            {/* Main Markdown Body Content */}
            <BlogContent content={post.bodyContent} />

            {/* 20 FAQ Accordion */}
            {post.faqs && post.faqs.length > 0 && (
              <BlogFaqAccordion faqs={post.faqs} />
            )}

            {/* Strategic Call to Action Block */}
            {post.callToAction && (
              <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-500/10 via-[var(--surface-soft)] to-[var(--surface-card)] p-6 sm:p-8 md:p-10 shadow-sm space-y-4 my-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Strategic Next Steps
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight m-0">
                  Ready to Execute Your Global Trade Operations?
                </h3>

                <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[var(--body-strong)] m-0">
                  {post.callToAction}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                  <Link
                    href="/create-export-profile"
                    className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold no-underline shadow-sm transition-transform active:scale-[0.98]"
                    style={{ backgroundColor: "var(--brand-ochre)", color: "var(--ink)" }}
                  >
                    <span>Create Export Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-[var(--hairline)] bg-[var(--surface-card)] text-[var(--ink)] no-underline hover:bg-[var(--surface-soft)] transition-colors"
                  >
                    <span>Request Trade Advisory</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Footer Action Bar */}
            <div className="pt-8 border-t border-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--ink)] hover:text-amber-800 no-underline transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All 31 Guides</span>
              </Link>

              <BlogShareBar title={post.title} url={`${BASE_URL}/blog/${post.slug}`} />
            </div>
          </article>

          {/* ── Right Sticky Sidebar (4 cols on desktop) ── */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <BlogTableOfContents items={post.tableOfContents} />
            )}

            {/* Strategic Overview Card */}
            <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--hairline)]">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  Guide Key Metrics
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-[var(--muted)] block">Primary Focus</span>
                  <span className="font-semibold text-[var(--ink)]">{post.primaryKeyword}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[var(--muted)] block">Compliance Category</span>
                  <span className="font-semibold text-[var(--ink)]">{post.category}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[var(--muted)] block">Key Regulatory Frameworks</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {["DGFT", "ICEGATE", "FEMA", "CBIC", "RoDTEP"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--hairline)] text-[var(--ink)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Buyer Leads CTA Card */}
            <div className="rounded-2xl border border-[var(--hairline)] bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-soft)] p-5 space-y-3 shadow-2xs text-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto text-sm font-bold text-[var(--ink)] shadow-2xs"
                style={{ backgroundColor: "var(--brand-ochre)" }}
              >
                <Sparkles className="w-5 h-5 text-amber-900" />
              </div>
              <h4 className="text-sm sm:text-[15px] font-bold text-[var(--ink)] m-0">
                Connect with Global Buyers
              </h4>
              <p className="text-xs text-[var(--muted)] m-0 leading-relaxed">
                Join verified exporters accessing direct buyer inquiries and international procurement leads worldwide.
              </p>
              <Link
                href="/create-export-profile"
                className="btn-primary w-full py-2.5 rounded-full text-xs font-bold no-underline inline-flex items-center justify-center gap-1.5 shadow-xs"
                style={{ backgroundColor: "var(--brand-ochre)", color: "var(--ink)" }}
              >
                <span>Create Export Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Related Articles Section ── */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-[var(--hairline)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Continue Reading
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] m-0">
                  Related Trade &amp; Compliance Guides
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-bold text-[var(--ink)] hover:text-amber-800 no-underline hidden sm:inline-flex items-center gap-1"
              >
                <span>View all guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="flex flex-col justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)]/80 hover:bg-[var(--surface-card)] hover:border-[var(--brand-ochre)]/60 transition-all duration-200 hover:-translate-y-1 shadow-2xs p-5 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--ink)]">
                        {related.category}
                      </span>
                      <span className="text-[10.5px] text-[var(--muted)] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {related.readTimeMinutes}m
                      </span>
                    </div>

                    <h4 className="text-[15.5px] font-bold text-[var(--ink)] group-hover:text-amber-800 transition-colors line-clamp-2 m-0 leading-snug">
                      <Link href={`/blog/${related.slug}`} className="text-[var(--ink)] group-hover:text-amber-800 no-underline">
                        {related.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-[var(--muted)] line-clamp-2 m-0 leading-relaxed">
                      {related.introduction}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[var(--hairline)]/70 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[var(--muted-soft)] font-medium">
                      {related.publishedDate}
                    </span>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="font-bold text-[var(--ink)] group-hover:text-amber-800 no-underline inline-flex items-center gap-1 text-xs"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
