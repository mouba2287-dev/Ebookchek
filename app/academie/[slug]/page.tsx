import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Share2 } from 'lucide-react';
import { guidesData } from '@/lib/academieData';

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }));
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = guidesData.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
      {/* Back button */}
      <Link
        href="/academie"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:text-[#F2A93B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l&apos;Académie
      </Link>

      {/* Header */}
      <div className="space-y-4 bg-[#FAF8F3] dark:bg-[#1C1C36] p-6 sm:p-8 rounded-3xl border border-[#12122B]/10">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold uppercase px-3 py-1 rounded-full bg-[#F2A93B] text-[#12122B]">
            {guide.categoryLabel}
          </span>
          <span className="text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 flex items-center gap-1 font-semibold">
            <Clock className="w-4 h-4" /> {guide.readTime}
          </span>
        </div>

        <h1 className="font-title text-2xl sm:text-4xl font-extrabold text-[#12122B] dark:text-[#F5F5F3] leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 font-medium leading-relaxed">
          {guide.excerpt}
        </p>
      </div>

      {/* Guide Content Body */}
      <article className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/10 rounded-3xl p-6 sm:p-10 shadow-lg text-sm sm:text-base text-[#1B1B2F] dark:text-[#F5F5F3] leading-relaxed space-y-6">
        <div
          className="prose dark:prose-invert max-w-none space-y-4"
          dangerouslySetInnerHTML={{
            __html: guide.contentMarkdown
              .replace(/^# (.*$)/gim, '<h1 class="font-title text-2xl font-bold text-[#12122B] dark:text-white">$1</h1>')
              .replace(/^## (.*$)/gim, '<h2 class="font-title text-xl font-bold text-[#12122B] dark:text-white mt-6 mb-2">$1</h2>')
              .replace(/^### (.*$)/gim, '<h3 class="font-title text-lg font-bold text-[#12122B] dark:text-white mt-4 mb-2">$1</h3>')
              .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#12122B] dark:text-white">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
              .replace(/\n\n/g, '<p class="my-3"></p>')
          }}
        />
      </article>

      {/* Share & CTA */}
      <div className="bg-[#12122B] text-white p-6 rounded-3xl text-center space-y-4">
        <h3 className="font-title text-xl font-bold text-[#F2A93B]">
          Prêt à tester ces conseils sur ton propre livre ?
        </h3>
        <p className="text-xs text-white/80 max-w-md mx-auto">
          Lance un diagnostic instantané sur 5 axes pour identifier ce qui bloque tes ventes.
        </p>
        <Link
          href="/diagnostic"
          className="inline-flex items-center gap-2 bg-[#F2A93B] text-[#12122B] font-extrabold text-sm px-6 py-3.5 rounded-xl hover:bg-[#F2A93B]/90 transition-all min-h-[48px]"
        >
          <BookOpen className="w-4 h-4" /> Lancer un Diagnostic Gratuit
        </Link>
      </div>
    </div>
  );
}
