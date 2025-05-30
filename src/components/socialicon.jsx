import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter as XIcon,
  } from "lucide-react";
  
  export default function SocialIcons() {
    return (

      <div className="flex gap-4 text-black">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <XIcon className="w-6 h-6 hover:text-white" />
        </a>

        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 hover:text-white" />
        </a>

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6 hover:text-white" />
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 hover:text-white" />
        </a>
       
        
        
      </div>
    );
  }