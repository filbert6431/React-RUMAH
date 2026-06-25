import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import Container from "../../Layout/Container";
import PageBanner from "../../components/Guest/PageBanner";

export default function ContactUs() {
  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      {/* Page Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Reach us directly through WhatsApp or phone."
      />

      {/* Contact Information */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-md">
            <h2 className="text-3xl font-black text-[#1A1614]">
              My Contact Number
            </h2>
            <p className="mt-3 text-[#2D2825]/70">
              Click WhatsApp to send a message directly.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href="https://wa.me/6281226181479?text=Hello%2C%20I%20want%20to%20ask%20about%20Coffee%20House."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 font-bold text-[#1A1614] transition hover:bg-green-100"
              >
                <FaWhatsapp className="text-3xl text-green-600" />
                <span>Whatsapp : 62-812-2618-1479</span>
              </a>

              <a
                href="tel:081226181479"
                className="flex items-center gap-4 rounded-2xl border border-[#967259]/20 bg-[#F4EFEA] p-5 font-bold text-[#1A1614] transition hover:bg-[#e5ddd5]"
              >
                <FaPhoneAlt className="text-2xl text-[#967259]" />
                <span>Phone : 0812-2618-1479</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
