import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly will I receive my subscription?",
    answer: "Your subscription will be activated within 5-10 minutes after payment confirmation. You'll receive all login details via WhatsApp.",
  },
  {
    question: "Are these genuine subscriptions?",
    answer: "Yes, all our subscriptions are 100% genuine and verified. We only provide authentic accounts from official sources.",
  },
  {
    question: "What if my subscription stops working?",
    answer: "We offer a full money-back guarantee. If your subscription stops working within the purchased period, we'll either fix it immediately or provide a full refund.",
  },
  {
    question: "Can I share my subscription with family?",
    answer: "Yes! Most of our plans support multiple screens, so you can share with your family members as per the plan's terms.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, bank transfers, and all major payment methods. Payment details will be shared via WhatsApp after you contact us.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we have a 7-day money-back guarantee. If you're not satisfied with the service, we'll provide a full refund within 7 days of purchase.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Got questions? We've got answers
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0 border-b border-border/30 pb-4"
            >
              <AccordionTrigger className="text-left hover:no-underline" data-testid={`question-${index}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
