import { Github, Linkedin, Mail } from 'lucide-react';

export function SidebarFooter({ itemCount }) {
    return (
        <div className="border-t border-stone-200 bg-[#f5f2eb] p-6">
            <div className="text-base font-medium text-stone-500 text-center mb-4">
                {itemCount} items total
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-5">
                    <a
                        href="mailto:kaustav.raysinha@gmail.com"
                        className="p-2 text-stone-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                        title="Email Me"
                    >
                        <Mail size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kaustav-sinha-ray"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        title="LinkedIn Profile"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="https://github.com/kaustavray21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all"
                        title="GitHub Profile"
                    >
                        <Github size={24} />
                    </a>
                </div>
                <p className="text-sm text-stone-500 text-center">
                    © {new Date().getFullYear()} <span className="text-stone-700 font-semibold">kaustavray21</span>.
                </p>
            </div>
        </div>
    );
}
