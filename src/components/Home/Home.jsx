import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import shreyasmedialogo from "../../assets/shreyasmedialogo.png";

const Home = () => {
  const [newstype, setNewsType] = useState("");
  const [categeory, setCategeory] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();


    const commonPayload = {
    category: categeory
  };

  if (newstype === "URL") {
    commonPayload.url = inputValue;
  } else if (newstype === "Heading") {
    commonPayload.heading = inputValue;
  } else if (newstype === "RSS") {
    commonPayload.rss = inputValue;
  }

  try {
    const category = categeory?.trim();
    const input = inputValue?.trim();

    if (newstype === "URL" || newstype === "Heading") {
      const webhook1 = "https://hook.eu2.make.com/vfjihod4exc8kc80hkd8uglb5mk85hcy";
      const payload1 = {};

      if (category) payload1.category = category;
      if (newstype === "URL" && input) payload1.url = input;
      if (newstype === "Heading" && input) payload1.heading = input;

      const response1 = await axios.post(webhook1, payload1, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Webhook 1 response:", response1.data);
    }

    if (newstype === "RSS") {
      const webhook2 = "https://hook.eu2.make.com/giw69tjcu5eos3gux5wtgxkz4hi324u6";
      const payload2 = {
        rss: inputValue,
        category: categeory
      };

      const response2 = await axios.post(webhook2, payload2, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Webhook 2 response:", response2.data);
    }
    setCategeory("");
    setNewsType("");
    setInputValue("");
    toast.success("Your data submitted successfully");
  } catch (error) {
    console.error("Error submitting news data:", error);
    toast.error("Failed to submit data");
  }

  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-20 rounded shadow-md w-full max-w-xs md:max-w-2xl lg:max-w-4xl space-y-8">
          {/* <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-orange-800 mb-10">Shreyas Media</h2> */}
          <img src={shreyasmedialogo} alt='shreyasmedialogo' className="w-60 h-20 md:w-auto md:h-auto" />
          {/* First Dropdown */}
          <div>
            <label className="text-xl font-medium">News :</label>
            <select
              value={newstype}
              onChange={(e) => setNewsType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="URL">URL</option>
              <option value="Heading">Heading</option>
              <option value="RSS">RSS</option>
            </select>
          </div>

          {/* Conditional Input Field */}
          {(newstype === "URL" || newstype === "Heading") && (
            <div>
              <label className="text-xl font-medium">
                {newstype === "URL" ? "Enter URL:" : "Enter Heading:"}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={newstype === "URL" ? "https://example.com/news" : "News Heading"}
                required
              />
            </div>
          )}

          {/* Second Dropdown */}
          <div>
            <label className="text-xl font-medium">Category :</label>
            <select
            value={categeory}
            onChange={(e) => setCategeory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="politics">Politics</option>
            <option value="business_finance">Business & Finance</option>
            <option value="crime_public_safety">Crime & Public Safety</option>
            <option value="weather_disaster">Weather & Natural Disaster</option>
            <option value="health_medicine">Health & Medicine</option>
            <option value="science_technology">Science & Technology</option>
            <option value="sports">Sports</option>
            <option value="entertainment_culture">
              Entertainment & Culture
            </option>
            <option value="lifestyle_society">Lifestyle & Society</option>
          </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-lg font-medium text-white py-2 rounded hover:bg-blue-700 transition duration-200">
            Submit
          </button>
          <Link to='/adminlogin' className="p-2 bg-pink-700 text-white text-base font-semibold float-end">Logout</Link>
        </form>
      </div>
    </>
  );
};

export default Home;

