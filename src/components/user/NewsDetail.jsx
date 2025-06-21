// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import parse, { domToReact } from 'html-react-parser';
// import shreyasmedialogo from "../../assets/shreyasmedialogo.png";
// import img1 from "../../assets/img1.png";
// import ReactPlayer from 'react-player';
// import Footer from "../layouts/Footer";

// const languageMap = {
//   'Hindi': 'hi',
//   'Bengali': 'bn',
//   'Tamil': 'ta',
//   'Telugu': 'te',
//   'Marathi': 'mr',
//   'Gujarati': 'gu',
//   'Kannada': 'kn',
//   'Malayalam': 'ml',
//   'Punjabi': 'pa',
//   'Odia': 'or',
//   'Assamese': 'as',
//   'English': 'en'
// };

// const cleanText = (text) => {
//   if (!text) return text;

//   let cleaned = text
//     .replace(/â|â/g, '"')
//     .replace(/â|â/g, "'")
//     .replace(/â/g, "—")
//     .replace(/â¦/g, "…")
//     .replace(/â¢/g, "•");

//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = cleaned;
//   cleaned = tempDiv.textContent || tempDiv.innerText || "";

//   cleaned = cleaned.replace(
//     /(?:https?|ftp|blob):\/\/[\w\-]+(?:\.[\w\-]+)*[\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]?/gi,
//     ''
//   );

//   cleaned = cleaned.replace(
//     /\b(?:www\.)?[\w\-]+\.[\w\-]+(?:\/[\w\-\.]*)*\b/gi,
//     ''
//   );

//   return cleaned
//     .replace(/\s{2,}/g, ' ')
//     .trim();
// };

// const options = {
//   replace: (domNode) => {
//     if (domNode.type === 'text') {
//       const replaced = cleanText(domNode.data);
//       if (replaced !== domNode.data) {
//         return parse(replaced, options);
//       }
//       return replaced;
//     }
//     if (domNode.type === 'tag') {
//       const allowedTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'img', 'b'];

//       if (!allowedTags.includes(domNode.name)) return null;

//       const children = domToReact(domNode.children, options);

//       switch (domNode.name) {
//         case 'h1':
//           return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
//         case 'h2':
//           return <h2 className="text-2xl font-semibold mb-3">{children}</h2>;
//         case 'h3':
//           return <h3 className="text-xl font-medium mb-2">{children}</h3>;
//         case 'p':
//           return <p className="text-base mb-2 leading-relaxed">{children}</p>;
//         case 'ul':
//           return <ul className="list-disc ml-6 mb-2">{children}</ul>;
//         case 'li':
//           return <li className="mb-1">{children}</li>;
//         case 'b':
//           return <strong className="font-semibold">{children}</strong>;
//         default:
//           return null;
//       }
//     }
//   },
// };

// const NewsDetail = () => {
//   const { newsId } = useParams();
//   const [newsData, setNewsData] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
//   const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [utterance, setUtterance] = useState(null);
//   const [translatorReady, setTranslatorReady] = useState(false);
//   const [isOpenVideo, setIsOpenVideo] = useState(false);
//   const [translatedText, setTranslatedText] = useState("");

//   useEffect(() => {
//     // Scroll to top when the component mounts
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   }, []);

//   const openModal = () => {
//     setIsOpenVideo(true);
//   };

//   useEffect(() => {
//     return () => {
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//         setIsSpeaking(false);
//       }
//     };
//   }, [selectedLanguageCode]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const micButton = document.querySelector('.mic-button');
//       if (micButton && !micButton.contains(event.target) && isSpeaking) {
//         handleStopSpeaking();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isSpeaking]);

//   // Load Google Translate script
//   useEffect(() => {
//     if (window.google?.translate) {
//       setTranslatorReady(true);
    
//       // Check for saved language
//       const savedLang = localStorage.getItem('selectedNewsLanguage');
//       if (savedLang) {
//         const { code } = JSON.parse(savedLang);
//         applyLanguageSelection(code);
//       }
//       return;
//     }

//   window.googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "en",
//         includedLanguages: Object.values(languageMap).join(","),
//         autoDisplay: false,
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//       },
//       "google_translate_element"
//     );
//     setTranslatorReady(true);
    
//     // Check for saved language after initialization
//     const savedLang = localStorage.getItem('selectedNewsLanguage');
//     if (savedLang) {
//       const { code } = JSON.parse(savedLang);
//       // Small delay to ensure the translator is fully loaded
//       setTimeout(() => applyLanguageSelection(code), 500);
//     }
//   };

//   const script = document.createElement("script");
//   script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//   script.async = true;
//   script.defer = true;

//   script.onerror = () => {
//     console.error("Failed to load Google Translate script");
//   };

//   document.body.appendChild(script);

//   return () => {
//     if (window.googleTranslateElementInit) {
//       delete window.googleTranslateElementInit;
//     }
//   };
// }, []);

// useEffect(() => {
//   // Load persisted language
//   const savedLang = localStorage.getItem('selectedNewsLanguage');
//   if (savedLang) {
//     try {
//       const { name, code } = JSON.parse(savedLang);
//       setSelectedLanguage(name);
//       setSelectedLanguageCode(code);
      
//       // If translator is already ready, apply the language
//       if (translatorReady) {
//         applyLanguageSelection(code);
//       }
//     } catch (e) {
//       console.error('Error parsing saved language:', e);
//     }
//   }
  
//   fetchNewsData();
// }, []);

// // Separate function to apply language selection
// const applyLanguageSelection = (langCode) => {
//   // Try to use the direct API method first
//   try {
//     const translateElement = document.querySelector("#google_translate_element");
//     const iframe = translateElement?.querySelector("iframe");
//     const iframeDoc = iframe?.contentWindow?.document;

//     if (iframeDoc) {
//       const dropdown = iframeDoc.querySelector(".goog-te-combo");
//       if (dropdown) {
//         dropdown.value = langCode;
//         dropdown.dispatchEvent(new Event("change"));
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error accessing Google Translate iframe:", error);
//   }

//   // Fallback method
//   try {
//     const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
//     let googleSelect = null;
//     for (const selector of selectors) {
//       googleSelect = document.querySelector(selector);
//       if (googleSelect) break;
//     }

//     if (googleSelect) {
//       googleSelect.value = langCode;
//       googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
//     }
//   } catch (error) {
//     console.error("Error changing language:", error);
//   }
// };

// const fetchNewsData = async () => {
//   try {
//     const response = await axios.get(
//       `https://blogs.workautomationhub.com/blog-details/${newsId}`
//     );
//     setNewsData(response.data);
//     setTranslatedText(response.data.content); // Initialize with original content
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchNewsData();
// }, []);

// const handleLanguageChange = (languageName) => {
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   }

//   const langCode = languageMap[languageName];
  
//   // Store in localStorage
//   localStorage.setItem('selectedNewsLanguage', JSON.stringify({
//     name: languageName,
//     code: langCode
//   }));
  
//   setSelectedLanguage(languageName);
//   setSelectedLanguageCode(langCode);

//   if (!translatorReady) {
//     console.warn("Google Translate not yet initialized");
//     return;
//   }

//   // Try to use the direct API method first
//   try {
//     const translateElement = document.querySelector("#google_translate_element");
//     const iframe = translateElement?.querySelector("iframe");
//     const iframeDoc = iframe?.contentWindow?.document;

//     if (iframeDoc) {
//       const dropdown = iframeDoc.querySelector(".goog-te-combo");
//       if (dropdown) {
//         dropdown.value = langCode;
//         dropdown.dispatchEvent(new Event("change"));
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error accessing Google Translate iframe:", error);
//   }

//   // Fallback method
//   try {
//     const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
//     let googleSelect = null;
//     for (const selector of selectors) {
//       googleSelect = document.querySelector(selector);
//       if (googleSelect) break;
//     }

//     if (googleSelect) {
//       googleSelect.value = langCode;
//       googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
//     } else {
//       document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
//       window.location.reload();
//     }
//   } catch (error) {
//     console.error("Error changing language:", error);
//   }
// };

// // New effect to watch for translation changes
// useEffect(() => {
//   if (!translatorReady || !selectedLanguageCode) return;

//   const checkForTranslation = () => {
//     try {
//       const translatedElements = document.querySelectorAll(".goog-trans-section");
//       let translatedText = "";
      
//       translatedElements.forEach(el => {
//         translatedText += " " + cleanText(el.textContent);
//       });

//       if (translatedText) {
//         setTranslatedText(translatedText);
//       }
//     } catch (error) {
//       console.error("Error getting translated text:", error);
//     }
//   };

//   // Check for translation periodically since Google Translate loads asynchronously
//   const interval = setInterval(checkForTranslation, 500);
  
//   return () => clearInterval(interval);
// }, [translatorReady, selectedLanguageCode]);

// const handleSpeak = () => {
//   // Cancel any ongoing speech
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//   }

//   const langCode = selectedLanguageCode || 'en';
//   const speechLangCode = speechLangMap[langCode] || 'en-US';
//   const voices = window.speechSynthesis.getVoices();
  
//   // Find the best available voice for the language
//   const availableVoice = voices.find(voice => 
//     voice.lang.startsWith(langCode) || 
//     voice.lang.startsWith(speechLangCode)
//   );

//   if (!availableVoice && langCode !== 'en') {
//     alert(`${selectedLanguage} voice not available. Using English instead.`);
//     return handleSpeakWithFallback();
//   }

//   if (!translatedText) {
//     alert("No text available to speak");
//     return;
//   }

//   const utterance = new SpeechSynthesisUtterance(cleanText(translatedText));
//   utterance.lang = availableVoice ? availableVoice.lang : 'en-US';
//   utterance.voice = availableVoice || null;
//   utterance.rate = 0.9;
//   utterance.pitch = 1;

//   utterance.onstart = () => setIsSpeaking(true);
//   utterance.onend = () => setIsSpeaking(false);
//   utterance.onerror = (e) => {
//     console.error("Speech error:", e);
//     setIsSpeaking(false);
//     if (langCode !== 'en') {
//       handleSpeakWithFallback();
//     }
//   };

//   window.speechSynthesis.speak(utterance);
// };

// const handleSpeakWithFallback = () => {
//   const utterance = new SpeechSynthesisUtterance(cleanText(translatedText));
//   utterance.lang = 'en-US';
//   utterance.rate = 0.9;
//   utterance.pitch = 1;
  
//   utterance.onstart = () => setIsSpeaking(true);
//   utterance.onend = () => setIsSpeaking(false);
  
//   window.speechSynthesis.speak(utterance);
// };

//   const handleStopSpeaking = () => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }
//   };

//   const imageUrl = newsData?.image;
//   const data = newsData?.content;
//   const video = newsData?.video_url;
  
//   return (
//     <>
//     <div className="px-20 mb-6 flex flex-col">
//       {/* Hidden Google Translate element */}
//       <div id="google_translate_element" style={{ display: 'none' }}></div>
      
//       <div className='w-full h-24 px-20 py-2.5'>
//         <div className='flex flex-col gap-0'>
//           <Link className='w-40 h-16 bg-center bg-cover relative' style={{backgroundImage: `url(${shreyasmedialogo})`}} to='/'>
//             <div className='absolute bottom-[30px] right-[50px]'>
//               <h1 className='text-lg font-semibold text-[#1C1C1C] font-[montserrat]'>News</h1>
//             </div>
//           </Link>
//         </div>
//       </div>
//       <Link to='/' className="px-6 py-3 bg-[#E11A68] text-[#FFF] w-[148px] mb-2 rounded text-center font-[montserrat] flex items-center justify-center space-x-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         <span>Go Back</span>
//       </Link>
//       <img
//         src={imageUrl}
//         alt={newsData?.title}
//         className="w-full h-[600px] object-fit"
//       />
      
//       <div className="flex justify-between my-5">
//         <div className="flex">
//       <h1 className="px-6 py-3 bg-[#E11A68] text-[#FFF] w-[218px] text-center font-[montserrat] flex items-center justify-center">
//         To Read the news
//       </h1>
//       {
//         newsData?.video_url &&
//       <button 
//         onClick={openModal}
//         className="px-6 py-3 flex gap-2.5 justify-center items-center border border-2 border-[#E11A68]"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="32"
//           height="32"
//           viewBox="0 0 32 32"
//           fill="none"
//         >
//           <rect width="32" height="32" rx="16" fill="#E11A68" />
//           <path d="M11.7142 8V24L24.2857 16L11.7142 8Z" fill="white" />
//         </svg>
//         <h1 className="font-semibold font-[montserrat]" onClick={openModal}>
//           To watch the news
//         </h1>
//       </button>
//       }

//       {isOpenVideo && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="relative w-full max-w-4xl">
//             <button 
//               onClick={() => setIsOpenVideo(false)}
//               className="absolute -top-10 right-0 bg-[#E11A68] text-white rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               ×
//             </button>
//             <ReactPlayer
//               url={video}
//               controls={true}
//               width="100%"
//               height="auto"
//               style={{ aspectRatio: '16/9' }}
//             />
//           </div>
//         </div>
//       )}
//     </div>

//         <div className="flex gap-6">
//           <button 
//   className={`mic-button px-2 py-1 w-11 h-11 rounded-full flex items-center justify-center ${
//     isSpeaking ? 'bg-gray-600' : 'bg-[#E11A68]'
//   }`}
//   onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
// >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="24"
//               viewBox="0 0 18 24"
//               fill="none"
//             >
//               <path
//                 d="M9 15.1579C7.9881 15.1579 7.12798 14.7895 6.41964 14.0526C5.71131 13.3158 5.35714 12.4211 5.35714 11.3684V3.78947C5.35714 2.73684 5.71131 1.84211 6.41964 1.10526C7.12798 0.368421 7.9881 0 9 0C10.0119 0 10.872 0.368421 11.5804 1.10526C12.2887 1.84211 12.6429 2.73684 12.6429 3.78947V11.3684C12.6429 12.4211 12.2887 13.3158 11.5804 14.0526C10.872 14.7895 10.0119 15.1579 9 15.1579ZM7.78571 24V20.1158C5.68095 19.8211 3.94048 18.8421 2.56429 17.1789C1.1881 15.5158 0.5 13.5789 0.5 11.3684H2.92857C2.92857 13.1158 3.52074 14.6055 4.70507 15.8375C5.88941 17.0695 7.32105 17.6851 9 17.6842C10.679 17.6834 12.111 17.0674 13.2961 15.8362C14.4813 14.6051 15.073 13.1158 15.0714 11.3684H17.5C17.5 13.5789 16.8119 15.5158 15.4357 17.1789C14.0595 18.8421 12.319 19.8211 10.2143 20.1158V24H7.78571Z"
//                 fill="white"
//               />
//             </svg>
//           </button>
          
//           <div className="relative group">
//             <button 
//               className="border border-[#E11A68] flex items-center px-5 py-3 w-56 text-lg font-medium font-[montserrat] text-[#E11A68] cursor-pointer"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {selectedLanguage}
//               <svg 
//                 className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             <div 
//               className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-md mt-1 w-48 z-10 border border-gray-200`}
//             >
//               <ul className="py-1 max-h-60 overflow-y-auto">
//                 {Object.keys(languageMap).map((language) => (
//                   <li key={language}>
//                     <button 
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E11A68] hover:text-white cursor-pointer"
//                       onClick={() => {
//                         handleLanguageChange(language);
//                         setIsOpen(false);
//                       }}
//                     >
//                       {language}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content display  2222222222222 */}
//       <div className="news-detail">
//         {typeof data === 'string' ? parse(data, options) : null}
//       </div>

//       <div className="my-4">
//         <h1 className="font-[inter] text-lg italic">
//           These reforms are not just policy shifts — they are bold steps toward
//           empowering every citizen.” – Prime Minister
//         </h1>
//       </div>

//       <div className="flex flex-col gap-2">
//         <h1 className="font-[inter] text-lg">Share on :</h1>
//         <div className="flex gap-4">
//           {/*  */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M12.4285 16.8571L16.5064 14.5L12.4285 12.1429V16.8571ZM21.5114 10.705C21.6135 11.0743 21.6843 11.5693 21.7314 12.1979C21.7864 12.8264 21.81 13.3686 21.81 13.84L21.8571 14.5C21.8571 16.2207 21.7314 17.4857 21.5114 18.295C21.315 19.0021 20.8593 19.4579 20.1521 19.6543C19.7828 19.7564 19.1071 19.8271 18.07 19.8743C17.0485 19.9293 16.1135 19.9529 15.2493 19.9529L14 20C10.7078 20 8.65711 19.8743 7.84782 19.6543C7.14068 19.4579 6.68497 19.0021 6.48854 18.295C6.38639 17.9257 6.31568 17.4307 6.26854 16.8021C6.21354 16.1736 6.18997 15.6314 6.18997 15.16L6.14282 14.5C6.14282 12.7793 6.26854 11.5143 6.48854 10.705C6.68497 9.99786 7.14068 9.54214 7.84782 9.34571C8.21711 9.24357 8.89282 9.17286 9.92997 9.12571C10.9514 9.07071 11.8864 9.04714 12.7507 9.04714L14 9C17.2921 9 19.3428 9.12571 20.1521 9.34571C20.8593 9.54214 21.315 9.99786 21.5114 10.705Z"
//               fill="white"
//             />
//           </svg>
//           {/*  */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M22 9.52941C21.4111 9.79706 20.7763 9.97294 20.1185 10.0571C20.7916 9.65176 21.3117 9.00941 21.5564 8.23706C20.9216 8.61941 20.218 8.88706 19.4761 9.04C18.8719 8.38235 18.0229 8 17.0593 8C15.262 8 13.7935 9.46824 13.7935 11.2806C13.7935 11.5406 13.8241 11.7929 13.8776 12.03C11.1549 11.8924 8.7304 10.5847 7.11663 8.60412C6.83365 9.08588 6.67304 9.65176 6.67304 10.2482C6.67304 11.3876 7.24665 12.3971 8.13384 12.9706C7.59082 12.9706 7.08604 12.8176 6.64245 12.5882V12.6112C6.64245 14.2018 7.77438 15.5324 9.27342 15.8306C8.79223 15.9628 8.28684 15.9812 7.79732 15.8841C8.00505 16.536 8.41188 17.1064 8.96062 17.5152C9.50937 17.9239 10.1724 18.1505 10.8566 18.1629C9.69688 19.081 8.25928 19.5772 6.78011 19.57C6.52008 19.57 6.26004 19.5547 6 19.5241C7.45316 20.4571 9.18164 21 11.0325 21C17.0593 21 20.3709 15.9988 20.3709 11.6629C20.3709 11.5176 20.3709 11.38 20.3633 11.2347C21.0057 10.7759 21.5564 10.1947 22 9.52941Z"
//               fill="white"
//             />
//           </svg>
//           {/*  */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M22.0201 14.0201C22.0201 9.59298 18.4271 6 14 6C9.57296 6 5.97998 9.59298 5.97998 14.0201C5.97998 17.9018 8.73888 21.1338 12.396 21.8797V16.4261H10.792V14.0201H12.396V12.015C12.396 10.4672 13.6552 9.20802 15.203 9.20802H17.2081V11.614H15.604C15.1629 11.614 14.802 11.9749 14.802 12.416V14.0201H17.2081V16.4261H14.802V22C18.8522 21.599 22.0201 18.1825 22.0201 14.0201Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default NewsDetail;






// ------------------------------------CORRECT------------------------------------



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import parse, { domToReact } from 'html-react-parser';
// import shreyasmedialogo from "../../assets/shreyasmedialogo.png";
// import img1 from "../../assets/img1.png";
// import ReactPlayer from 'react-player';
// import Footer from "../layouts/Footer";

// const languageMap = {
//   'Hindi': 'hi',
//   'Bengali': 'bn',
//   'Tamil': 'ta',
//   'Telugu': 'te',
//   'Marathi': 'mr',
//   'Gujarati': 'gu',
//   'Kannada': 'kn',
//   'Malayalam': 'ml',
//   'Punjabi': 'pa',
//   'Odia': 'or',
//   'Assamese': 'as',
//   'English': 'en'
// };

// // Add the missing speechLangMap
// const speechLangMap = {
//   'hi': 'hi-IN',
//   'bn': 'bn-IN',
//   'ta': 'ta-IN',
//   'te': 'te-IN',
//   'mr': 'mr-IN',
//   'gu': 'gu-IN',
//   'kn': 'kn-IN',
//   'ml': 'ml-IN',
//   'pa': 'pa-IN',
//   'or': 'or-IN',
//   'as': 'as-IN',
//   'en': 'en-US'
// };

// const cleanText = (text) => {
//   if (!text) return text;

//   let cleaned = text
//     .replace(/â|â/g, '"')
//     .replace(/â|â/g, "'")
//     .replace(/â/g, "—")
//     .replace(/â¦/g, "…")
//     .replace(/â¢/g, "•");

//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = cleaned;
//   cleaned = tempDiv.textContent || tempDiv.innerText || "";

//   cleaned = cleaned.replace(
//     /(?:https?|ftp|blob):\/\/[\w\-]+(?:\.[\w\-]+)*[\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]?/gi,
//     ''
//   );

//   cleaned = cleaned.replace(
//     /\b(?:www\.)?[\w\-]+\.[\w\-]+(?:\/[\w\-\.]*)*\b/gi,
//     ''
//   );

//   return cleaned
//     .replace(/\s{2,}/g, ' ')
//     .trim();
// };

// const options = {
//   replace: (domNode) => {
//     if (domNode.type === 'text') {
//       const replaced = cleanText(domNode.data);
//       if (replaced !== domNode.data) {
//         return parse(replaced, options);
//       }
//       return replaced;
//     }
//     if (domNode.type === 'tag') {
//       const allowedTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'img', 'b'];

//       if (!allowedTags.includes(domNode.name)) return null;

//       const children = domToReact(domNode.children, options);

//       switch (domNode.name) {
//         case 'h1':
//           return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
//         case 'h2':
//           return <h2 className="text-2xl font-semibold mb-3">{children}</h2>;
//         case 'h3':
//           return <h3 className="text-xl font-medium mb-2">{children}</h3>;
//         case 'p':
//           return <p className="text-base mb-2 leading-relaxed">{children}</p>;
//         case 'ul':
//           return <ul className="list-disc ml-6 mb-2">{children}</ul>;
//         case 'li':
//           return <li className="mb-1">{children}</li>;
//         case 'b':
//           return <strong className="font-semibold">{children}</strong>;
//         default:
//           return null;
//       }
//     }
//   },
// };

// const NewsDetail = () => {
//   const { newsId } = useParams();
//   const [newsData, setNewsData] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
//   const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [utterance, setUtterance] = useState(null);
//   const [translatorReady, setTranslatorReady] = useState(false);
//   const [isOpenVideo, setIsOpenVideo] = useState(false);
//   const [translatedText, setTranslatedText] = useState("");

//   useEffect(() => {
//     // Scroll to top when the component mounts
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   }, []);

//   const openModal = () => {
//     setIsOpenVideo(true);
//   };

//   useEffect(() => {
//     return () => {
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//         setIsSpeaking(false);
//       }
//     };
//   }, [selectedLanguageCode]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const micButton = document.querySelector('.mic-button');
//       if (micButton && !micButton.contains(event.target) && isSpeaking) {
//         handleStopSpeaking();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isSpeaking]);

//   // Load Google Translate script
//   useEffect(() => {
//     if (window.google?.translate) {
//       setTranslatorReady(true);
    
//       // Check for saved language
//       const savedLang = localStorage.getItem('selectedNewsLanguage');
//       if (savedLang) {
//         const { code } = JSON.parse(savedLang);
//         applyLanguageSelection(code);
//       }
//       return;
//     }

//   window.googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "en",
//         includedLanguages: Object.values(languageMap).join(","),
//         autoDisplay: false,
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//       },
//       "google_translate_element"
//     );
//     setTranslatorReady(true);
    
//     // Check for saved language after initialization
//     const savedLang = localStorage.getItem('selectedNewsLanguage');
//     if (savedLang) {
//       const { code } = JSON.parse(savedLang);
//       // Small delay to ensure the translator is fully loaded
//       setTimeout(() => applyLanguageSelection(code), 500);
//     }
//   };

//   const script = document.createElement("script");
//   script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//   script.async = true;
//   script.defer = true;

//   script.onerror = () => {
//     console.error("Failed to load Google Translate script");
//   };

//   document.body.appendChild(script);

//   return () => {
//     if (window.googleTranslateElementInit) {
//       delete window.googleTranslateElementInit;
//     }
//   };
// }, []);

// useEffect(() => {
//   // Load persisted language
//   const savedLang = localStorage.getItem('selectedNewsLanguage');
//   if (savedLang) {
//     try {
//       const { name, code } = JSON.parse(savedLang);
//       setSelectedLanguage(name);
//       setSelectedLanguageCode(code);
      
//       // If translator is already ready, apply the language
//       if (translatorReady) {
//         applyLanguageSelection(code);
//       }
//     } catch (e) {
//       console.error('Error parsing saved language:', e);
//     }
//   }
  
//   fetchNewsData();
// }, []);

// // Separate function to apply language selection
// const applyLanguageSelection = (langCode) => {
//   // Try to use the direct API method first
//   try {
//     const translateElement = document.querySelector("#google_translate_element");
//     const iframe = translateElement?.querySelector("iframe");
//     const iframeDoc = iframe?.contentWindow?.document;

//     if (iframeDoc) {
//       const dropdown = iframeDoc.querySelector(".goog-te-combo");
//       if (dropdown) {
//         dropdown.value = langCode;
//         dropdown.dispatchEvent(new Event("change"));
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error accessing Google Translate iframe:", error);
//   }

//   // Fallback method
//   try {
//     const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
//     let googleSelect = null;
//     for (const selector of selectors) {
//       googleSelect = document.querySelector(selector);
//       if (googleSelect) break;
//     }

//     if (googleSelect) {
//       googleSelect.value = langCode;
//       googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
//     }
//   } catch (error) {
//     console.error("Error changing language:", error);
//   }
// };

// const fetchNewsData = async () => {
//   try {
//     const response = await axios.get(
//       `https://blogs.workautomationhub.com/blog-details/${newsId}`
//     );
//     setNewsData(response.data);
//     setTranslatedText(response.data.content); // Initialize with original content
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchNewsData();
// }, []);

// const handleLanguageChange = (languageName) => {
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   }

//   const langCode = languageMap[languageName];
  
//   // Store in localStorage
//   localStorage.setItem('selectedNewsLanguage', JSON.stringify({
//     name: languageName,
//     code: langCode
//   }));
  
//   setSelectedLanguage(languageName);
//   setSelectedLanguageCode(langCode);

//   if (!translatorReady) {
//     console.warn("Google Translate not yet initialized");
//     return;
//   }

//   // Try to use the direct API method first
//   try {
//     const translateElement = document.querySelector("#google_translate_element");
//     const iframe = translateElement?.querySelector("iframe");
//     const iframeDoc = iframe?.contentWindow?.document;

//     if (iframeDoc) {
//       const dropdown = iframeDoc.querySelector(".goog-te-combo");
//       if (dropdown) {
//         dropdown.value = langCode;
//         dropdown.dispatchEvent(new Event("change"));
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error accessing Google Translate iframe:", error);
//   }

//   // Fallback method
//   try {
//     const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
//     let googleSelect = null;
//     for (const selector of selectors) {
//       googleSelect = document.querySelector(selector);
//       if (googleSelect) break;
//     }

//     if (googleSelect) {
//       googleSelect.value = langCode;
//       googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
//     } else {
//       document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
//       window.location.reload();
//     }
//   } catch (error) {
//     console.error("Error changing language:", error);
//   }
// };

// // New effect to watch for translation changes
// useEffect(() => {
//   if (!translatorReady || !selectedLanguageCode) return;

//   const checkForTranslation = () => {
//     try {
//       const translatedElements = document.querySelectorAll(".goog-trans-section");
//       let translatedText = "";
      
//       translatedElements.forEach(el => {
//         translatedText += " " + cleanText(el.textContent);
//       });

//       if (translatedText) {
//         setTranslatedText(translatedText);
//       }
//     } catch (error) {
//       console.error("Error getting translated text:", error);
//     }
//   };

//   // Check for translation periodically since Google Translate loads asynchronously
//   const interval = setInterval(checkForTranslation, 500);
  
//   return () => clearInterval(interval);
// }, [translatorReady, selectedLanguageCode]);

// // Updated handleSpeak function
// const handleSpeak = () => {
//   // Cancel any ongoing speech
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//   }

//   const langCode = selectedLanguageCode || 'en';
//   const speechLangCode = speechLangMap[langCode] || 'en-US';
  
//   // Get the text to speak
//   let textToSpeak = '';
  
//   if (langCode === 'en') {
//     // Use original content for English
//     textToSpeak = cleanText(newsData?.content || '');
//   } else {
//     // For other languages, try to get the translated content from the page
//     const newsDetailDiv = document.querySelector('.news-detail');
//     if (newsDetailDiv) {
//       const translatedContent = newsDetailDiv.innerText || newsDetailDiv.textContent;
//       textToSpeak = cleanText(translatedContent);
//     }
    
//     // Fallback to translatedText state if available
//     if (!textToSpeak && translatedText) {
//       textToSpeak = cleanText(translatedText);
//     }
    
//     // Final fallback to original content
//     if (!textToSpeak) {
//       textToSpeak = cleanText(newsData?.content || '');
//     }
//   }

//   if (!textToSpeak) {
//     alert("No text available to speak");
//     return;
//   }

//   // Wait for voices to load
//   const loadVoices = () => {
//     const voices = window.speechSynthesis.getVoices();
    
//     // Find the best available voice for the language
//     const availableVoice = voices.find(voice => 
//       voice.lang.toLowerCase().startsWith(langCode.toLowerCase()) || 
//       voice.lang.toLowerCase() === speechLangCode.toLowerCase()
//     );

//     if (!availableVoice && langCode !== 'en') {
//       console.warn(`${selectedLanguage} voice not available. Available voices:`, 
//         voices.filter(v => v.lang.startsWith(langCode)).map(v => v.name + ' - ' + v.lang)
//       );
//       alert(`${selectedLanguage} voice not available. Using English instead.`);
//       return handleSpeakWithFallback();
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak);
//     utterance.lang = speechLangCode;
//     if (availableVoice) {
//       utterance.voice = availableVoice;
//     }
//     utterance.rate = 0.9;
//     utterance.pitch = 1;

//     utterance.onstart = () => {
//       console.log(`Speech started in ${selectedLanguage} (${speechLangCode})`);
//       setIsSpeaking(true);
//     };
    
//     utterance.onend = () => {
//       console.log('Speech ended');
//       setIsSpeaking(false);
//     };
    
//     utterance.onerror = (e) => {
//       console.error("Speech error:", e);
//       setIsSpeaking(false);
//       if (langCode !== 'en') {
//         handleSpeakWithFallback();
//       }
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   // Check if voices are already loaded
//   if (window.speechSynthesis.getVoices().length > 0) {
//     loadVoices();
//   } else {
//     // Wait for voices to load
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }
// };

// // Updated handleSpeakWithFallback function
// const handleSpeakWithFallback = () => {
//   // Get text content
//   let textToSpeak = '';
//   const newsDetailDiv = document.querySelector('.news-detail');
//   if (newsDetailDiv) {
//     textToSpeak = cleanText(newsDetailDiv.innerText || newsDetailDiv.textContent);
//   } else if (translatedText) {
//     textToSpeak = cleanText(translatedText);
//   } else {
//     textToSpeak = cleanText(newsData?.content || '');
//   }

//   const utterance = new SpeechSynthesisUtterance(textToSpeak);
//   utterance.lang = 'en-US';
//   utterance.rate = 0.9;
//   utterance.pitch = 1;
  
//   utterance.onstart = () => setIsSpeaking(true);
//   utterance.onend = () => setIsSpeaking(false);
//   utterance.onerror = (e) => {
//     console.error("Fallback speech error:", e);
//     setIsSpeaking(false);
//   };
  
//   window.speechSynthesis.speak(utterance);
// };

//   const handleStopSpeaking = () => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }
//   };

//   const imageUrl = newsData?.image;
//   const data = newsData?.content;
//   const video = newsData?.video_url;
  
//   return (
//     <>
//     <div className="px-20 mb-6 flex flex-col">
//       {/* Hidden Google Translate element */}
//       <div id="google_translate_element" style={{ display: 'none' }}></div>
      
//       <div className='w-full h-24 px-20 py-2.5'>
//         <div className='flex flex-col gap-0'>
//           <Link className='w-40 h-16 bg-center bg-cover relative' style={{backgroundImage: `url(${shreyasmedialogo})`}} to='/'>
//             <div className='absolute bottom-[30px] right-[50px]'>
//               <h1 className='text-lg font-semibold text-[#1C1C1C] font-[montserrat]'>News</h1>
//             </div>
//           </Link>
//         </div>
//       </div>
//       <Link to='/' className="px-6 py-3 bg-[#E11A68] text-[#FFF] w-[148px] mb-2 rounded text-center font-[montserrat] flex items-center justify-center space-x-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         <span>Go Back</span>
//       </Link>
//       <img
//         src={imageUrl}
//         alt={newsData?.title}
//         className="w-full h-[600px] object-fit"
//       />
      
//       <div className="flex justify-between my-5">
//         <div className="flex">
//       <h1 className="px-6 py-3 bg-[#E11A68] text-[#FFF] w-[218px] text-center font-[montserrat] flex items-center justify-center">
//         To Read the news
//       </h1>
//       {
//         newsData?.video_url &&
//       <button 
//         onClick={openModal}
//         className="px-6 py-3 flex gap-2.5 justify-center items-center border border-2 border-[#E11A68]"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="32"
//           height="32"
//           viewBox="0 0 32 32"
//           fill="none"
//         >
//           <rect width="32" height="32" rx="16" fill="#E11A68" />
//           <path d="M11.7142 8V24L24.2857 16L11.7142 8Z" fill="white" />
//         </svg>
//         <h1 className="font-semibold font-[montserrat]" onClick={openModal}>
//           To watch the news
//         </h1>
//       </button>
//       }

//       {isOpenVideo && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="relative w-full max-w-4xl">
//             <button 
//               onClick={() => setIsOpenVideo(false)}
//               className="absolute -top-10 right-0 bg-[#E11A68] text-white rounded-full w-8 h-8 flex items-center justify-center"
//             >
//               ×
//             </button>
//             <ReactPlayer
//               url={video}
//               controls={true}
//               width="100%"
//               height="auto"
//               style={{ aspectRatio: '16/9' }}
//             />
//           </div>
//         </div>
//       )}
//     </div>

//         <div className="flex gap-6">
//           <button 
//   className={`mic-button px-2 py-1 w-11 h-11 rounded-full flex items-center justify-center ${
//     isSpeaking ? 'bg-gray-600' : 'bg-[#E11A68]'
//   }`}
//   onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
// >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="24"
//               viewBox="0 0 18 24"
//               fill="none"
//             >
//               <path
//                 d="M9 15.1579C7.9881 15.1579 7.12798 14.7895 6.41964 14.0526C5.71131 13.3158 5.35714 12.4211 5.35714 11.3684V3.78947C5.35714 2.73684 5.71131 1.84211 6.41964 1.10526C7.12798 0.368421 7.9881 0 9 0C10.0119 0 10.872 0.368421 11.5804 1.10526C12.2887 1.84211 12.6429 2.73684 12.6429 3.78947V11.3684C12.6429 12.4211 12.2887 13.3158 11.5804 14.0526C10.872 14.7895 10.0119 15.1579 9 15.1579ZM7.78571 24V20.1158C5.68095 19.8211 3.94048 18.8421 2.56429 17.1789C1.1881 15.5158 0.5 13.5789 0.5 11.3684H2.92857C2.92857 13.1158 3.52074 14.6055 4.70507 15.8375C5.88941 17.0695 7.32105 17.6851 9 17.6842C10.679 17.6834 12.111 17.0674 13.2961 15.8362C14.4813 14.6051 15.073 13.1158 15.0714 11.3684H17.5C17.5 13.5789 16.8119 15.5158 15.4357 17.1789C14.0595 18.8421 12.319 19.8211 10.2143 20.1158V24H7.78571Z"
//                 fill="white"
//               />
//             </svg>
//           </button>
          
//           <div className="relative group">
//             <button 
//               className="border border-[#E11A68] flex items-center px-5 py-3 w-56 text-lg font-medium font-[montserrat] text-[#E11A68] cursor-pointer"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {selectedLanguage}
//               <svg 
//                 className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             <div 
//               className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-md mt-1 w-48 z-10 border border-gray-200`}
//             >
//               <ul className="py-1 max-h-60 overflow-y-auto">
//                 {Object.keys(languageMap).map((language) => (
//                   <li key={language}>
//                     <button 
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E11A68] hover:text-white cursor-pointer"
//                       onClick={() => {
//                         handleLanguageChange(language);
//                         setIsOpen(false);
//                       }}
//                     >
//                       {language}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

     
// //       {/* Content display  2222222222222 */}
//        <div className="news-detail">
//          {typeof data === 'string' ? parse(data, options) : null}
//        </div>

//        <div className="my-4">
//          <h1 className="font-[inter] text-lg italic">
//            These reforms are not just policy shifts — they are bold steps toward
//            empowering every citizen.” – Prime Minister
//          </h1>
//        </div>

//        <div className="flex flex-col gap-2">
//          <h1 className="font-[inter] text-lg">Share on :</h1>
//          <div className="flex gap-4">
//            {/*  */}
//            <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M12.4285 16.8571L16.5064 14.5L12.4285 12.1429V16.8571ZM21.5114 10.705C21.6135 11.0743 21.6843 11.5693 21.7314 12.1979C21.7864 12.8264 21.81 13.3686 21.81 13.84L21.8571 14.5C21.8571 16.2207 21.7314 17.4857 21.5114 18.295C21.315 19.0021 20.8593 19.4579 20.1521 19.6543C19.7828 19.7564 19.1071 19.8271 18.07 19.8743C17.0485 19.9293 16.1135 19.9529 15.2493 19.9529L14 20C10.7078 20 8.65711 19.8743 7.84782 19.6543C7.14068 19.4579 6.68497 19.0021 6.48854 18.295C6.38639 17.9257 6.31568 17.4307 6.26854 16.8021C6.21354 16.1736 6.18997 15.6314 6.18997 15.16L6.14282 14.5C6.14282 12.7793 6.26854 11.5143 6.48854 10.705C6.68497 9.99786 7.14068 9.54214 7.84782 9.34571C8.21711 9.24357 8.89282 9.17286 9.92997 9.12571C10.9514 9.07071 11.8864 9.04714 12.7507 9.04714L14 9C17.2921 9 19.3428 9.12571 20.1521 9.34571C20.8593 9.54214 21.315 9.99786 21.5114 10.705Z"
//               fill="white"
//             />
//           </svg>
//           {/*  */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M22 9.52941C21.4111 9.79706 20.7763 9.97294 20.1185 10.0571C20.7916 9.65176 21.3117 9.00941 21.5564 8.23706C20.9216 8.61941 20.218 8.88706 19.4761 9.04C18.8719 8.38235 18.0229 8 17.0593 8C15.262 8 13.7935 9.46824 13.7935 11.2806C13.7935 11.5406 13.8241 11.7929 13.8776 12.03C11.1549 11.8924 8.7304 10.5847 7.11663 8.60412C6.83365 9.08588 6.67304 9.65176 6.67304 10.2482C6.67304 11.3876 7.24665 12.3971 8.13384 12.9706C7.59082 12.9706 7.08604 12.8176 6.64245 12.5882V12.6112C6.64245 14.2018 7.77438 15.5324 9.27342 15.8306C8.79223 15.9628 8.28684 15.9812 7.79732 15.8841C8.00505 16.536 8.41188 17.1064 8.96062 17.5152C9.50937 17.9239 10.1724 18.1505 10.8566 18.1629C9.69688 19.081 8.25928 19.5772 6.78011 19.57C6.52008 19.57 6.26004 19.5547 6 19.5241C7.45316 20.4571 9.18164 21 11.0325 21C17.0593 21 20.3709 15.9988 20.3709 11.6629C20.3709 11.5176 20.3709 11.38 20.3633 11.2347C21.0057 10.7759 21.5564 10.1947 22 9.52941Z"
//               fill="white"
//             />
//           </svg>
//           {/*  */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 28 28"
//             fill="none"
//           >
//             <rect width="28" height="28" rx="14" fill="#E11A68" />
//             <path
//               d="M22.0201 14.0201C22.0201 9.59298 18.4271 6 14 6C9.57296 6 5.97998 9.59298 5.97998 14.0201C5.97998 17.9018 8.73888 21.1338 12.396 21.8797V16.4261H10.792V14.0201H12.396V12.015C12.396 10.4672 13.6552 9.20802 15.203 9.20802H17.2081V11.614H15.604C15.1629 11.614 14.802 11.9749 14.802 12.416V14.0201H17.2081V16.4261H14.802V22C18.8522 21.599 22.0201 18.1825 22.0201 14.0201Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

//  export default NewsDetail;













import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse, { domToReact } from 'html-react-parser';
import shreyasmedialogo from "../../assets/shreyasmedialogo.png";
import img1 from "../../assets/img1.png";
import ReactPlayer from 'react-player';
import Footer from "../layouts/Footer";

const languageMap = {
  'Hindi': 'hi',
  'Bengali': 'bn',
  'Tamil': 'ta',
  'Telugu': 'te',
  'Marathi': 'mr',
  'Gujarati': 'gu',
  'Kannada': 'kn',
  'Malayalam': 'ml',
  'Punjabi': 'pa',
  'Odia': 'or',
  'Assamese': 'as',
  'English': 'en'
};

// Add the missing speechLangMap
const speechLangMap = {
  'hi': 'hi-IN',
  'bn': 'bn-IN',
  'ta': 'ta-IN',
  'te': 'te-IN',
  'mr': 'mr-IN',
  'gu': 'gu-IN',
  'kn': 'kn-IN',
  'ml': 'ml-IN',
  'pa': 'pa-IN',
  'or': 'or-IN',
  'as': 'as-IN',
  'en': 'en-US'
};

const cleanText = (text) => {
  if (!text) return text;

  let cleaned = text
    .replace(/â|â/g, '"')
    .replace(/â|â/g, "'")
    .replace(/â/g, "—")
    .replace(/â¦/g, "…")
    .replace(/â¢/g, "•");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleaned;
  cleaned = tempDiv.textContent || tempDiv.innerText || "";

  cleaned = cleaned.replace(
    /(?:https?|ftp|blob):\/\/[\w\-]+(?:\.[\w\-]+)*[\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]?/gi,
    ''
  );

  cleaned = cleaned.replace(
    /\b(?:www\.)?[\w\-]+\.[\w\-]+(?:\/[\w\-\.]*)*\b/gi,
    ''
  );

  return cleaned
    .replace(/\s{2,}/g, ' ')
    .trim();
};

const options = {
  replace: (domNode) => {
    if (domNode.type === 'text') {
      const replaced = cleanText(domNode.data);
      if (replaced !== domNode.data) {
        return parse(replaced, options);
      }
      return replaced;
    }
    if (domNode.type === 'tag') {
      const allowedTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'img', 'b'];

      if (!allowedTags.includes(domNode.name)) return null;

      const children = domToReact(domNode.children, options);

      switch (domNode.name) {
        case 'h1':
          return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
        case 'h2':
          return <h2 className="text-2xl font-semibold mb-3">{children}</h2>;
        case 'h3':
          return <h3 className="text-xl font-medium mb-2">{children}</h3>;
        case 'p':
          return <p className="text-base mb-2 leading-relaxed">{children}</p>;
        case 'ul':
          return <ul className="list-disc ml-6 mb-2">{children}</ul>;
        case 'li':
          return <li className="mb-1">{children}</li>;
        case 'b':
          return <strong className="font-semibold">{children}</strong>;
        default:
          return null;
      }
    }
  },
};

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [translatorReady, setTranslatorReady] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  // Add this at the beginning of your component
// useEffect(() => {
//   if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
//   }
// }, []);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const openModal = () => {
    setIsOpenVideo(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [selectedLanguageCode]);

  // Updated useEffect for handling click outside - Fixed audio control
  useEffect(() => {
    const handleClickOutside = (event) => {
      const micButton = document.querySelector('.mic-button');
      if (micButton && !micButton.contains(event.target) && isSpeaking) {
        handleStopSpeaking();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpeaking]);

  // Load Google Translate script
  useEffect(() => {
    if (window.google?.translate) {
      setTranslatorReady(true);
    
      // Check for saved language
      const savedLang = localStorage.getItem('selectedNewsLanguage');
      if (savedLang) {
        const { code } = JSON.parse(savedLang);
        applyLanguageSelection(code);
      }
      return;
    }

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: Object.values(languageMap).join(","),
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
    setTranslatorReady(true);
    
    // Check for saved language after initialization
    const savedLang = localStorage.getItem('selectedNewsLanguage');
    if (savedLang) {
      const { code } = JSON.parse(savedLang);
      // Small delay to ensure the translator is fully loaded
      setTimeout(() => applyLanguageSelection(code), 2000);
    }
  };

  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.defer = true;

  script.onerror = () => {
    console.error("Failed to load Google Translate script");
  };

  document.body.appendChild(script);

  return () => {
    if (window.googleTranslateElementInit) {
      delete window.googleTranslateElementInit;
    }
  };
}, []);

useEffect(() => {
  // Load persisted language
  const savedLang = localStorage.getItem('selectedNewsLanguage');
  if (savedLang) {
    try {
      const { name, code } = JSON.parse(savedLang);
      setSelectedLanguage(name);
      setSelectedLanguageCode(code);
      
      // If translator is already ready, apply the language
      if (translatorReady) {
        applyLanguageSelection(code);
      }
    } catch (e) {
      console.error('Error parsing saved language:', e);
    }
  }
  
  fetchNewsData();
}, []);

// Separate function to apply language selection
const applyLanguageSelection = (langCode) => {
  // Try to use the direct API method first
  try {
    const translateElement = document.querySelector("#google_translate_element");
    const iframe = translateElement?.querySelector("iframe");
    const iframeDoc = iframe?.contentWindow?.document;

    if (iframeDoc) {
      const dropdown = iframeDoc.querySelector(".goog-te-combo");
      if (dropdown) {
        dropdown.value = langCode;
        dropdown.dispatchEvent(new Event("change"));
        return;
      }
    }
  } catch (error) {
    console.error("Error accessing Google Translate iframe:", error);
  }

  // Fallback method
  try {
    const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
    let googleSelect = null;
    for (const selector of selectors) {
      googleSelect = document.querySelector(selector);
      if (googleSelect) break;
    }

    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

const fetchNewsData = async () => {
  try {
    const response = await axios.get(
      `https://blogs.workautomationhub.com/blog-details/${newsId}`
    );
    setNewsData(response.data);
    setTranslatedText(response.data.content); // Initialize with original content
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchNewsData();
}, []);

const handleLanguageChange = (languageName) => {
  // Stop speech when language changes - Fixed audio control
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  const langCode = languageMap[languageName];
  
  // Store in localStorage
  localStorage.setItem('selectedNewsLanguage', JSON.stringify({
    name: languageName,
    code: langCode
  }));
  
  setSelectedLanguage(languageName);
  setSelectedLanguageCode(langCode);

  if (!translatorReady) {
    console.warn("Google Translate not yet initialized");
    return;
  }

  // Try to use the direct API method first
  try {
    const translateElement = document.querySelector("#google_translate_element");
    const iframe = translateElement?.querySelector("iframe");
    const iframeDoc = iframe?.contentWindow?.document;

    if (iframeDoc) {
      const dropdown = iframeDoc.querySelector(".goog-te-combo");
      if (dropdown) {
        dropdown.value = langCode;
        dropdown.dispatchEvent(new Event("change"));
        return;
      }
    }
  } catch (error) {
    console.error("Error accessing Google Translate iframe:", error);
  }

  // Fallback method
  try {
    const selectors = [".goog-te-combo", ".skiptranslate .goog-te-combo", "select.goog-te-combo"];
    let googleSelect = null;
    for (const selector of selectors) {
      googleSelect = document.querySelector(selector);
      if (googleSelect) break;
    }

    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
      window.location.reload();
    }
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

// New effect to watch for translation changes
useEffect(() => {
  if (!translatorReady || !selectedLanguageCode) return;

  const checkForTranslation = () => {
    try {
      const translatedElements = document.querySelectorAll(".goog-trans-section");
      let translatedText = "";
      
      translatedElements.forEach(el => {
        translatedText += " " + cleanText(el.textContent);
      });

      if (translatedText) {
        setTranslatedText(translatedText);
      }
    } catch (error) {
      console.error("Error getting translated text:", error);
    }
  };

  // Check for translation periodically since Google Translate loads asynchronously
  const interval = setInterval(checkForTranslation, 500);
  
  return () => clearInterval(interval);
}, [translatorReady, selectedLanguageCode]);

// Updated handleSpeak function - Fixed audio control
const handleSpeak = () => {
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
  const langCode = selectedLanguageCode || 'en';
  const speechLangCode = speechLangMap[langCode] || 'en-US';
  
  // Get the text to speak
  let textToSpeak = '';
  const newsDetailDiv = document.querySelector('.news-detail');
  if (newsDetailDiv) {
    textToSpeak = cleanText(newsDetailDiv.innerText || newsDetailDiv.textContent);
  } else if (translatedText) {
    textToSpeak = cleanText(translatedText);
  } else {
    textToSpeak = cleanText(newsData?.content || '');
  }

  if (!textToSpeak) {
    alert("No text available to speak");
    return;
  }

  const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
  newUtterance.lang = speechLangCode;
  newUtterance.rate = 0.9;
  newUtterance.pitch = 1;

  newUtterance.onstart = () => setIsSpeaking(true);
  newUtterance.onend = () => setIsSpeaking(false);
  newUtterance.onerror = () => setIsSpeaking(false);

  // Set the utterance before speaking
  setUtterance(newUtterance);
  window.speechSynthesis.speak(newUtterance);
};

// Separate function to start speech - Fixed audio control
const startSpeech = () => {
  const langCode = selectedLanguageCode || 'en';
  const speechLangCode = speechLangMap[langCode] || 'en-US';
  
  // Get the text to speak
  let textToSpeak = '';
  
  if (langCode === 'en') {
    // Use original content for English
    textToSpeak = cleanText(newsData?.content || '');
  } else {
    // For other languages, try to get the translated content from the page
    const newsDetailDiv = document.querySelector('.news-detail');
    if (newsDetailDiv) {
      const translatedContent = newsDetailDiv.innerText || newsDetailDiv.textContent;
      textToSpeak = cleanText(translatedContent);
    }
    
    // Fallback to translatedText state if available
    if (!textToSpeak && translatedText) {
      textToSpeak = cleanText(translatedText);
    }
    
    // Final fallback to original content
    if (!textToSpeak) {
      textToSpeak = cleanText(newsData?.content || '');
    }
  }

  if (!textToSpeak) {
    alert("No text available to speak");
    return;
  }

  // Wait for voices to load
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    
    // Find the best available voice for the language
    const availableVoice = voices.find(voice => 
      voice.lang.toLowerCase().startsWith(langCode.toLowerCase()) || 
      voice.lang.toLowerCase() === speechLangCode.toLowerCase()
    );

    if (!availableVoice && langCode !== 'en') {
      console.warn(`${selectedLanguage} voice not available. Available voices:`, 
        voices.filter(v => v.lang.startsWith(langCode)).map(v => v.name + ' - ' + v.lang)
      );
      alert(`${selectedLanguage} voice not available. Using English instead.`);
      return handleSpeakWithFallback();
    }

    const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
    newUtterance.lang = speechLangCode;
    if (availableVoice) {
      newUtterance.voice = availableVoice;
    }
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;

    // Fixed audio control - Updated event handlers
    newUtterance.onstart = () => {
      console.log(`Speech started in ${selectedLanguage} (${speechLangCode})`);
      setIsSpeaking(true);
    };
    
    newUtterance.onend = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
      setUtterance(null);
    };
    
    newUtterance.onerror = (e) => {
      console.error("Speech error:", e);
      setIsSpeaking(false);
      setUtterance(null);
      if (langCode !== 'en') {
        handleSpeakWithFallback();
      }
    };

    // Store the utterance reference - Fixed audio control
    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  };

  // Check if voices are already loaded
  if (window.speechSynthesis.getVoices().length > 0) {
    loadVoices();
  } else {
    // Wait for voices to load
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
};

// Updated handleSpeakWithFallback function - Fixed audio control
const handleSpeakWithFallback = () => {
  // Get text content
  let textToSpeak = '';
  const newsDetailDiv = document.querySelector('.news-detail');
  if (newsDetailDiv) {
    textToSpeak = cleanText(newsDetailDiv.innerText || newsDetailDiv.textContent);
  } else if (translatedText) {
    textToSpeak = cleanText(translatedText);
  } else {
    textToSpeak = cleanText(newsData?.content || '');
  }

  const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
  newUtterance.lang = 'en-US';
  newUtterance.rate = 0.9;
  newUtterance.pitch = 1;
  
  // Fixed audio control - Updated event handlers
  newUtterance.onstart = () => {
    setIsSpeaking(true);
  };
  
  newUtterance.onend = () => {
    setIsSpeaking(false);
    setUtterance(null);
  };
  
  newUtterance.onerror = (e) => {
    console.error("Fallback speech error:", e);
    setIsSpeaking(false);
    setUtterance(null);
  };
  
  // Store the utterance reference - Fixed audio control
  setUtterance(newUtterance);
  window.speechSynthesis.speak(newUtterance);
};

// Updated handleStopSpeaking function - Fixed audio control
const handleStopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    // Force immediate state update - Fixed audio control
    setIsSpeaking(false);
    setUtterance(null);
  }
};

// Updated handleMicClick function - Fixed audio control
const handleMicClick = () => {
  if (isSpeaking) {
    // Stop immediately
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setUtterance(null);
  } else {
    // Start speaking
    handleSpeak();
  }
};

  const imageUrl = newsData?.image;
  const data = newsData?.content;
  const video = newsData?.video_url;
  
  return (
    <>
    <div className="px-8 lg:px-20 mb-6 flex flex-col">
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      <div className='w-full h-24 px-20 py-2.5'>
        <div className='flex flex-col gap-0'>
          <Link className='w-40 h-16 bg-center bg-cover relative' style={{backgroundImage: `url(${shreyasmedialogo})`}} to='/'>
            <div className='absolute bottom-[30px] right-[50px]'>
              <h1 className='text-lg font-semibold text-[#1C1C1C] font-[montserrat]'>News</h1>
            </div>
          </Link>
        </div>
      </div>
      <Link to='/' className="px-3 lg:px-6 py-3 bg-[#E11A68] text-[#FFF] w-[148px] mb-2 rounded text-center font-[montserrat] flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-xs lg:text-base">Go Back</span>
      </Link>
      <img
        src={imageUrl}
        alt={newsData?.title}
        className="w-full h-[300px] lg:h-[600px] object-fit"
      />
      
      <div className="flex flex-col-reverse lg:flex-row justify-center  lg:justify-between gap-6 lg:gap-0 my-5">
        <div className="flex">
      <h1 className="px-2 lg:px-6 py-2 lg:py-3 bg-[#E11A68] text-[#FFF] w-[218px] text-sm lg:text-base text-center font-[montserrat] flex items-center justify-center">
        To Read the news
      </h1>
      {
        newsData?.video_url &&
      <button 
        onClick={openModal}
        className="px-6 py-3 flex gap-2.5 justify-center items-center border border-2 border-[#E11A68]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect width="32" height="32" rx="16" fill="#E11A68" />
          <path d="M11.7142 8V24L24.2857 16L11.7142 8Z" fill="white" />
        </svg>
        <h1 className="font-semibold font-[montserrat]" onClick={openModal}>
          To watch the news
        </h1>
      </button>
      }

      {isOpenVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsOpenVideo(false)}
              className="absolute -top-10 right-0 bg-[#E11A68] text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <ReactPlayer
              url={video}
              controls={true}
              width="100%"
              height="auto"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
      )}
    </div>

        <div className="flex gap-6">
          {/* Updated mic button with fixed audio control */}
          <button 
            className={`mic-button px-2 py-1 w-11 h-11 rounded-full flex items-center justify-center ${
              isSpeaking ? 'bg-gray-600' : 'bg-[#E11A68]'
            }`}
            onClick={handleMicClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
            >
              <path
                d="M9 15.1579C7.9881 15.1579 7.12798 14.7895 6.41964 14.0526C5.71131 13.3158 5.35714 12.4211 5.35714 11.3684V3.78947C5.35714 2.73684 5.71131 1.84211 6.41964 1.10526C7.12798 0.368421 7.9881 0 9 0C10.0119 0 10.872 0.368421 11.5804 1.10526C12.2887 1.84211 12.6429 2.73684 12.6429 3.78947V11.3684C12.6429 12.4211 12.2887 13.3158 11.5804 14.0526C10.872 14.7895 10.0119 15.1579 9 15.1579ZM7.78571 24V20.1158C5.68095 19.8211 3.94048 18.8421 2.56429 17.1789C1.1881 15.5158 0.5 13.5789 0.5 11.3684H2.92857C2.92857 13.1158 3.52074 14.6055 4.70507 15.8375C5.88941 17.0695 7.32105 17.6851 9 17.6842C10.679 17.6834 12.111 17.0674 13.2961 15.8362C14.4813 14.6051 15.073 13.1158 15.0714 11.3684H17.5C17.5 13.5789 16.8119 15.5158 15.4357 17.1789C14.0595 18.8421 12.319 19.8211 10.2143 20.1158V24H7.78571Z"
                fill="white"
              />
            </svg>
          </button>
          
          <div className="relative group">
            <button 
              className="border border-[#E11A68] flex items-center px-5 py-3 w-56 text-lg font-medium font-[montserrat] text-[#E11A68] cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedLanguage}
              <svg 
                className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-md mt-1 w-48 z-10 border border-gray-200`}
            >
              <ul className="py-1 max-h-60 overflow-y-auto">
                {Object.keys(languageMap).map((language) => (
                  <li key={language}>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E11A68] hover:text-white cursor-pointer"
                      onClick={() => {
                        handleLanguageChange(language);
                        setIsOpen(false);
                      }}
                    >
                      {language}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

           
       {/* Content display  2222222222222 */}
        <div className="news-detail">
          {typeof data === 'string' ? parse(data, options) : null}
        </div>

        {/* <div className="my-4">
          <h1 className="font-[inter] text-lg italic">
            These reforms are not just policy shifts — they are bold steps toward
            empowering every citizen.” – Prime Minister
          </h1>
        </div> */}

        <div className="flex flex-col gap-2 my-4">
          <h1 className="font-[inter] text-lg">Share on :</h1>
          <div className="flex gap-4">
            {/*  */}
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="14" fill="#E11A68" />
            <path
              d="M12.4285 16.8571L16.5064 14.5L12.4285 12.1429V16.8571ZM21.5114 10.705C21.6135 11.0743 21.6843 11.5693 21.7314 12.1979C21.7864 12.8264 21.81 13.3686 21.81 13.84L21.8571 14.5C21.8571 16.2207 21.7314 17.4857 21.5114 18.295C21.315 19.0021 20.8593 19.4579 20.1521 19.6543C19.7828 19.7564 19.1071 19.8271 18.07 19.8743C17.0485 19.9293 16.1135 19.9529 15.2493 19.9529L14 20C10.7078 20 8.65711 19.8743 7.84782 19.6543C7.14068 19.4579 6.68497 19.0021 6.48854 18.295C6.38639 17.9257 6.31568 17.4307 6.26854 16.8021C6.21354 16.1736 6.18997 15.6314 6.18997 15.16L6.14282 14.5C6.14282 12.7793 6.26854 11.5143 6.48854 10.705C6.68497 9.99786 7.14068 9.54214 7.84782 9.34571C8.21711 9.24357 8.89282 9.17286 9.92997 9.12571C10.9514 9.07071 11.8864 9.04714 12.7507 9.04714L14 9C17.2921 9 19.3428 9.12571 20.1521 9.34571C20.8593 9.54214 21.315 9.99786 21.5114 10.705Z"
              fill="white"
            />
          </svg>
          {/*  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="14" fill="#E11A68" />
            <path
              d="M22 9.52941C21.4111 9.79706 20.7763 9.97294 20.1185 10.0571C20.7916 9.65176 21.3117 9.00941 21.5564 8.23706C20.9216 8.61941 20.218 8.88706 19.4761 9.04C18.8719 8.38235 18.0229 8 17.0593 8C15.262 8 13.7935 9.46824 13.7935 11.2806C13.7935 11.5406 13.8241 11.7929 13.8776 12.03C11.1549 11.8924 8.7304 10.5847 7.11663 8.60412C6.83365 9.08588 6.67304 9.65176 6.67304 10.2482C6.67304 11.3876 7.24665 12.3971 8.13384 12.9706C7.59082 12.9706 7.08604 12.8176 6.64245 12.5882V12.6112C6.64245 14.2018 7.77438 15.5324 9.27342 15.8306C8.79223 15.9628 8.28684 15.9812 7.79732 15.8841C8.00505 16.536 8.41188 17.1064 8.96062 17.5152C9.50937 17.9239 10.1724 18.1505 10.8566 18.1629C9.69688 19.081 8.25928 19.5772 6.78011 19.57C6.52008 19.57 6.26004 19.5547 6 19.5241C7.45316 20.4571 9.18164 21 11.0325 21C17.0593 21 20.3709 15.9988 20.3709 11.6629C20.3709 11.5176 20.3709 11.38 20.3633 11.2347C21.0057 10.7759 21.5564 10.1947 22 9.52941Z"
              fill="white"
            />
          </svg>
          {/*  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="14" fill="#E11A68" />
            <path
              d="M22.0201 14.0201C22.0201 9.59298 18.4271 6 14 6C9.57296 6 5.97998 9.59298 5.97998 14.0201C5.97998 17.9018 8.73888 21.1338 12.396 21.8797V16.4261H10.792V14.0201H12.396V12.015C12.396 10.4672 13.6552 9.20802 15.203 9.20802H17.2081V11.614H15.604C15.1629 11.614 14.802 11.9749 14.802 12.416V14.0201H17.2081V16.4261H14.802V22C18.8522 21.599 22.0201 18.1825 22.0201 14.0201Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

 export default NewsDetail;
