import { WeatherCondition, weatherCodeMap } from "@/utils/weatherConditions";

interface ClothingSuggestionsProps {
  weatherCode: number; // Open-Meteo weather code
  feelsLike: number; // feels like temperature in °C
}

interface ClothingItem {
  icon: string;
  label: string;
  color: string;
}

export function ClothingSuggestions({ weatherCode, feelsLike }: ClothingSuggestionsProps) {
  // Determine temp range
  const tempRange: "extremely_cold" | "very_cold" | "cold" | "mild" | "hot" | "very_hot" | "extremely_hot" =
    feelsLike <= -20
      ? "extremely_cold"
      : feelsLike <= -10
      ? "very_cold"
      : feelsLike <= 0
      ? "cold"
      : feelsLike <= 25
      ? "mild"
      : feelsLike <= 30
      ? "hot"
      : feelsLike <= 35
      ? "very_hot"
      : "extremely_hot";

  // Map weatherCode to Nepali condition
  const condition: WeatherCondition = weatherCodeMap[weatherCode] ?? "स्पष्ट आकाश";

  const getClothingSuggestions = (): ClothingItem[] => {
    const suggestions: ClothingItem[] = [];

    // Temperature-based suggestions (expanded)
    switch (tempRange) {
      case "extremely_cold":
        suggestions.push(
          { icon: "🧥", label: "दमदार ज्याकेट", color: "bg-orange-200" },
          { icon: "🧣", label: "गहिरो स्कार्फ", color: "bg-red-200" },
          { icon: "🧤", label: "तातो पन्जा", color: "bg-purple-200" },
          { icon: "🧦", label: "मोटो मोजा", color: "bg-pink-200" },
          { icon: "👢", label: "तातो बुट", color: "bg-amber-200" },
          { icon: "🧵", label: "तातो स्वेटर", color: "bg-yellow-200" },
          { icon: "🧢", label: "तातो टोपी", color: "bg-blue-200" }
        );
        break;
      case "very_cold":
        suggestions.push(
          { icon: "🧥", label: "तातो ज्याकेट", color: "bg-orange-150" },
          { icon: "🧣", label: "स्कार्फ", color: "bg-red-150" },
          { icon: "🧤", label: "पन्जा", color: "bg-purple-150" },
          { icon: "🧦", label: "मोजा", color: "bg-pink-150" },
          { icon: "👢", label: "तातो बुट", color: "bg-amber-150" }
        );
        break;
      case "cold":
        suggestions.push(
          { icon: "🧥", label: "हल्का ज्याकेट", color: "bg-orange-100" },
          { icon: "🧣", label: "स्कार्फ", color: "bg-red-100" },
          { icon: "🧤", label: "पन्जा", color: "bg-purple-100" },
          { icon: "🧦", label: "मोजा", color: "bg-pink-100" },
          { icon: "👢", label: "हल्का बुट", color: "bg-amber-100" }
        );
        break;
      case "mild":
        suggestions.push(
          { icon: "👔", label: "साधारण लुगा", color: "bg-green-100" },
          { icon: "🧥", label: "हल्का ज्याकेट", color: "bg-blue-100" },
          { icon: "👖", label: "प्यान्ट", color: "bg-purple-100" },
          { icon: "👟", label: "साधारण जुत्ता", color: "bg-gray-100" }
        );
        break;
      case "hot":
        suggestions.push(
          { icon: "👕", label: "हल्का टि-शर्ट", color: "bg-blue-100" },
          { icon: "🩳", label: "सर्ट", color: "bg-cyan-100" },
          { icon: "🧢", label: "टोपी", color: "bg-yellow-100" },
          { icon: "🩴", label: "स्यान्डल", color: "bg-orange-100" }
        );
        break;
      case "very_hot":
        suggestions.push(
          { icon: "👕", label: "हल्का लुगा", color: "bg-yellow-100" },
          { icon: "🩳", label: "सर्ट", color: "bg-cyan-100" },
          { icon: "🧢", label: "टोपी", color: "bg-pink-100" },
          { icon: "🕶️", label: "सुर्य चश्मा", color: "bg-orange-100" },
          { icon: "🩴", label: "स्यान्डल", color: "bg-cyan-100" },
          { icon: "🧴", label: "सनस्क्रिन", color: "bg-green-100" }
        );
        break;
      case "extremely_hot":
        suggestions.push(
          { icon: "👕", label: "सुपर हल्का लुगा", color: "bg-yellow-200" },
          { icon: "🩳", label: "सर्ट", color: "bg-cyan-200" },
          { icon: "🧢", label: "टोपी", color: "bg-pink-200" },
          { icon: "🕶️", label: "सुर्य चश्मा", color: "bg-orange-200" },
          { icon: "🩴", label: "स्यान्डल", color: "bg-cyan-200" },
          { icon: "🧴", label: "सनस्क्रिन", color: "bg-green-200" }
        );
        break;
    }

    // Weather-based additions (expanded)
    if (condition.includes("वर्षा") || condition.includes("पानी")) {
      suggestions.push(
        { icon: "☂️", label: "छाता", color: "bg-indigo-100" },
        { icon: "🥾", label: "रेन जुत्ता", color: "bg-teal-100" },
        { icon: "🧥", label: "रेनकोट", color: "bg-sky-100" },
        { icon: "🩴", label: "वाटरप्रूफ स्यान्डल", color: "bg-blue-100" }
      );
    }
    if (condition.includes("हिउँ")) {
      suggestions.push(
        { icon: "🧥", label: "तातो ज्याकेट", color: "bg-cyan-100" },
        { icon: "🧣", label: "मफलर", color: "bg-rose-100" },
        { icon: "🧤", label: "पन्जा", color: "bg-purple-100" },
        { icon: "🥾", label: "तातो बुट", color: "bg-orange-100" },
        { icon: "🧦", label: "तातो मोजा", color: "bg-pink-100" }
      );
    }
    if (condition.includes("धुंध")) {
      suggestions.push(
        { icon: "🧥", label: "हल्का ज्याकेट", color: "bg-gray-100" },
        { icon: "🧣", label: "स्कार्फ", color: "bg-gray-200" }
      );
    }
    if (condition.includes("तुफान") || condition.includes("बिजुली") || condition.includes("ओला")) {
      suggestions.push(
        { icon: "🧥", label: "सुरक्षात्मक ज्याकेट", color: "bg-gray-200" },
        { icon: "🧢", label: "टोपी", color: "bg-pink-200" },
        { icon: "🥾", label: "सुरक्षात्मक जुत्ता", color: "bg-gray-100" },
        { icon: "🧤", label: "सुरक्षात्मक पन्जा", color: "bg-purple-200" }
      );
    }
    if (condition.includes("स्पष्ट") || condition.includes("घाम")) {
      suggestions.push(
        { icon: "🕶️", label: "सुर्य चश्मा", color: "bg-yellow-100" },
        { icon: "🧢", label: "टोपी", color: "bg-orange-100" },
        { icon: "🧴", label: "सनस्क्रिन", color: "bg-green-100" }
      );
    }

    return suggestions;
  };

  const suggestions = getClothingSuggestions();

  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-purple-100/90 to-pink-100/90 rounded-3xl p-6 shadow-2xl border border-white/50">
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
          <span className="text-3xl">👗</span>
        </div>
        <div>
          <h3 className="text-purple-700">के लगाउनुहोस्?</h3>
          <div className="text-gray-600">आजको मौसम अनुसार</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className={`${item.color} rounded-xl p-4 shadow-md transform active:scale-95 transition-all duration-200 cursor-pointer hover:shadow-lg border border-white/50`}
          >
            <div className="text-4xl text-center mb-2">{item.icon}</div>
            <div className="text-center text-gray-800 leading-tight">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center text-gray-700 backdrop-blur-sm bg-white/70 rounded-xl p-3 border border-white/50">
        💡 सुरक्षित र आरामदायक रहनुहोस्
      </div>
    </div>
  );
}
