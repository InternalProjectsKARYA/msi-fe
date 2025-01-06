"use client";

import React from "react";
import {
    Instagram,
    Mail,
    MessageCircle,
    Send,
    Twitter,
    WhatsApp,
  } from "lucide-react";

const SocialIcons: React.FC = () => {
    const socialLinks = [
        {
          name: "Instagram",
          href: "https://www.instagram.com/",
          Icon: Instagram,
          color: "#C13584", // Instagram (Dull Pink)
        },
        {
          name: "WhatsApp",
          href: "https://www.whatsapp.com/",
          Icon: MessageCircle, // Use MessageCircle or Send as a placeholder
          color: "#25D366", // WhatsApp (Dull Green)
        },
        {
          name: "Twitter",
          href: "https://www.twitter.com/",
          Icon: Twitter,
          color: "#1DA1F2", // Twitter (Dull Blue)
        },
        {
          name: "SMS",
          href: "sms:+1234567890",
          Icon: MessageCircle,
          color: "#FF9800", // SMS (Orange)
        },
        {
          name: "Email",
          href: "mailto:someone@example.com",
          Icon: Mail,
          color: "#9E9E9E", // Email (Dull Gray)
        },
      ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <h1 className="text-3xl font-bold mb-6 text-center">Follow Us</h1>
      <ul className="flex space-x-6 mt-10">
  {socialLinks.map(({ name, href, Icon, color }) => (
    <li key={name} className="relative group">
      {/* Social Icon Link */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white text-gray-700 overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:text-white"
      >
        {/* Background Fill */}
        <div
          className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-300"
          style={{ backgroundColor: color }}
        ></div>
        {/* Icon */}
        <Icon size={28} className="relative z-10" />
      </a>
      {/* Tooltip */}
      <div
        className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default SocialIcons;
