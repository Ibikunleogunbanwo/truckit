
import Link from 'next/link';

const ContinueWithLogin = ({
  buttonText = "Continue",
  linkText = "",
  linkHref = "#",
  widthClass = "w-24",
  linkButton = "#",
  onClick

}) => {
  return (
    <div className="flex items-center space-x-4">
      <Link href={linkButton}>
      <button 
      onClick={onClick}
      className={`bg-teal-500 text-white border px-2 text-xs lg:text-sm border-teal-500 shadow-md ${widthClass} h-12 rounded cursor-pointer`}>
        {buttonText}
      </button>
      </Link>
      {linkText && (
        <div className="text-teal-500 hover:underline underline text-sm px-2 md:px-4">
          <Link href={linkHref}>{linkText}</Link>
        </div>
      )}
    </div>
  );
};

export default ContinueWithLogin;
