// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import ClickOutside from "@/components/ClickOutside";
// import { useRouter } from "next/navigation";
// import { LogOut } from 'lucide-react';
// import { Settings } from 'lucide-react';
// import { UserRound } from 'lucide-react';
// import { logout } from "./logout";



// const DropdownUser = () => {
//   const router = useRouter();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = async () => {
//     const isLogout = await logout();
//     localStorage.removeItem('selectedMenu');
//     router.push("/auth/signin")
//   };

//   return (
//     <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
//       <Link
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="flex items-center gap-4"
//         href="#"
//       >
{/* <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/user/user-03.png"
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span> */}

//   <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
//     <span className="hidden lg:block">Admin</span>

//     <svg
//       className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
//         fill=""
//       />
//     </svg>
//   </span>
// </Link>

{/* <!-- Dropdown Star --> */ }
// {dropdownOpen && (
//   <div
//     className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}
//   >
//     <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
{/* <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src="/images/user/user-03.png"
                style={{
                  width: "auto",
                  height: "auto",
                }}
                alt="User"
                className="overflow-hidden rounded-full"
              />

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span> */}

//             <span className="block">
//               <span className="block font-medium text-dark dark:text-white">
//                 Admin
//               </span>
//               <span className="block font-medium text-dark-5 dark:text-dark-6">
//                 jonson@nextadmin.com
//               </span>
//             </span>
//           </div>
//           <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
//             <li>
//               <Link
//                 href="/profile"
//                 className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
//               >
//                 <UserRound strokeWidth="1px" size="20px" />
//                 View profile
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/pages/settings"
//                 className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
//               >
//                 <Settings strokeWidth="1px" size="20px" />
//                 Account Settings
//               </Link>
//             </li>
//           </ul>
//           <div className="p-2.5">
//             <button
//               className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-red-500 duration-300 ease-in-out hover:bg-red-100 hover:text-red-700 dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
//               onClick={handleLogout}
//             >
//               <LogOut strokeWidth="1px" size="20px" />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//       {/* <!-- Dropdown End --> */}
//     </ClickOutside>
//   );
// };

// export default DropdownUser;






import { useState, useEffect } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { useRouter } from "next/navigation";
import { LogOut, Settings, UserRound } from 'lucide-react';
import { logout } from "./logout";
import Cookies from 'js-cookie';

const DropdownUser = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get email from cookie when component mounts
    const email = Cookies.get('userEmail');
    setUserEmail(email || 'User@example.com'); // Fallback email if none found
  }, []);

  const handleLogout = async () => {
    const isLogout = await logout();
    localStorage.removeItem('selectedMenu');
    Cookies.remove('userEmail'); // Remove email cookie on logout
    router.push("/auth/signin");
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">Admin</span>
          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}
        >
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                Admin
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                {userEmail}
              </span>
            </span>
          </div>
          {/* <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/profile"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <UserRound strokeWidth="1px" size="20px" />
                View profile
              </Link>
            </li>
            <li>
              <Link
                href="/pages/settings"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <Settings strokeWidth="1px" size="20px" />
                Account Settings
              </Link>
            </li>
          </ul> */}
          <div className="p-2.5">
            <button
              className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-red-500 duration-300 ease-in-out hover:bg-red-100 hover:text-red-700 dark:bg-red-700 dark:hover:bg-red-500 dark:text-white dark:hover:text-white lg:text-base"
              onClick={handleLogout}
            >
              <LogOut strokeWidth="1px" size="20px" />
              Logout
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;