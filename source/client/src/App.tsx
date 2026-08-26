/*
 * Innovation Archive direction: public-facing RTL-first portfolio routes with clear
 * document-style pages and a restrained, trustworthy information hierarchy.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Link } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function LegalPage({ type }: { type: "privacy" | "terms" | "about" | "contact" }) {
  const content = {
    privacy: {
      title: "سياسة الخصوصية",
      kicker: "وثيقة / 01",
      body: "هذه صفحة تمهيدية لسياسة الخصوصية الخاصة بالبورتفوليو. سيتم تخصيصها عند تحديد أدوات التحليلات، نماذج التواصل، ومصادر البيانات المستخدمة فعلياً.",
    },
    terms: {
      title: "الشروط والأحكام",
      kicker: "وثيقة / 02",
      body: "هذه صفحة تمهيدية للشروط والأحكام. ستُراجع وتُخصص قبل النشر النهائي بما يتوافق مع طبيعة الروابط والمشروعات والملفات المعروضة.",
    },
    about: {
      title: "عن عماد",
      kicker: "ملف / 02",
      body: "الصفحة الرئيسية هي المصدر الرئيسي للتعريف بالمسار المهني، القيادة، الإشراف، الهندسة، الابتكار، والمشروعات الرقمية المستقلة.",
    },
    contact: {
      title: "تواصل",
      kicker: "ملف / 11",
      body: "يمكن استخدام LinkedIn كبوابة التواصل الحالية. سيُضاف البريد أو نموذج التواصل عندما يرسل صاحب الموقع البيانات التي يريد عرضها علناً.",
    },
  }[type];

  return (
    <main className="legal-shell" dir="rtl">
      <div className="legal-card">
        <Link href="/" className="legal-back">← العودة إلى البورتفوليو</Link>
        <p className="eyebrow">{content.kicker}</p>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        <Link href="/" className="button button-copper">فتح الصفحة الرئيسية</Link>
      </div>
    </main>
  );
}

function NotFound() {
  return <LegalPage type="about" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={() => <LegalPage type="about" />} />
      <Route path="/contact" component={() => <LegalPage type="contact" />} />
      <Route path="/privacy-policy" component={() => <LegalPage type="privacy" />} />
      <Route path="/terms" component={() => <LegalPage type="terms" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
