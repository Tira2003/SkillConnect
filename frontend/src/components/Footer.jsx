export default function Footer() {
  return (
    <footer
      className="
        w-full
        bg-linear-to-r from-[#7D4DF4] to-[#A589FD]
        text-white
        py-8 px-6
      "
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-semibold">SkillConnect</h2>
          <p className="mt-2 text-gray-100 text-sm leading-relaxed">
            Connect with peers by skills, collaborate on requests, and grow together.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/skill-search" className="hover:text-white transition">Skill Search</a></li>
            <li><a href="/skill-request" className="hover:text-white transition">Skill Request</a></li>
            <li><a href="/community" className="hover:text-white transition">Community</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-100 text-sm">University of Sri Jayawardenepura</p>
          <p className="text-gray-100 text-sm">Faculty of Technology</p>
          <p className="text-gray-100 text-sm mt-2">support@skillconnect.edu</p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto mt-8 border-t border-white/30"></div>

      {/* Bottom note */}
      <p className="text-center text-gray-200 text-xs mt-6">
        © {new Date().getFullYear()} SkillConnect — All Rights Reserved.
      </p>
    </footer>
  );
}
