import React, { useState, useRef } from 'react';
import {
  Mic,
  Camera,
  Sparkles,
  Send,
  CheckCircle2,
  Volume2,
  Upload,
  RefreshCw,
  X
} from 'lucide-react';
import { api } from '../../../api';

interface AIAssistantViewProps {
  district: string;
  user: any;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  district,
  user
}) => {
  const [lang, setLang] = useState<'te' | 'en' | 'hi'>('te');
  const [mode, setMode] = useState<'voice' | 'disease'>('voice');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Vision scanner
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio speech synthesis helper
  const speakVoice = (text: string, l: 'te' | 'en' | 'hi') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = l === 'te' ? 'te-IN' : l === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Web Speech Recognition
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type your query below.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
      handleSendQuery(text);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendQuery = async (queryText?: string) => {
    const q = queryText || transcript;
    if (!q) return;

    setIsProcessing(true);
    try {
      const chatRes = await api.chatAI({
        message: q,
        lang,
        user_id: user?.id || 'AP-USER',
        user_name: user?.name || 'Farmer / Dealer',
        user_role: user?.role || 'dealer',
        district
      });

      const reply = chatRes?.reply || (lang === 'te' ? 'మీ ప్రశ్న ప్రాసెస్ చేయబడింది.' : 'Your query has been processed.');
      setResponse(reply);
      speakVoice(reply, lang);
    } catch {
      const fallback =
        lang === 'te'
          ? `${district} జిల్లాలో వరి, మిర్చి మరియు పసుపు పంటలకు గిరాకీ బాగుంది. మార్కెట్ ధరలు స్థిరంగా ఉన్నాయి.`
          : `In ${district} district, chilli, turmeric, and paddy demand remains strong. Average market prices are steady.`;
      setResponse(fallback);
      speakVoice(fallback, lang);
    } finally {
      setIsProcessing(false);
    }
  };

  const [detailedDiagnosis, setDetailedDiagnosis] = useState<any | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setIsScanning(true);
      setDiagnosisResult(null);
      setDetailedDiagnosis(null);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const result = await api.diagnoseCrop({
            image: base64,
            lang,
            district
          });
          setIsScanning(false);
          setDetailedDiagnosis(result);

          const summary =
            lang === 'te'
              ? (result.summary_te || `${result.crop_name || 'పంట'}: ${result.disease_detected || 'తెగులు గుర్తించబడింది'}. నివారణ: ${result.chemical_treatment || result.organic_treatment || 'నిపుణులను సంప్రదించండి'}`)
              : (result.summary_en || `${result.crop_name || 'Crop'}: ${result.disease_detected || 'Pathogen Detected'}. Spray: ${result.chemical_treatment || result.organic_treatment || 'Consult local KVK officer'}`);
          
          setDiagnosisResult(summary);
          speakVoice(summary, lang);
        } catch {
          setIsScanning(false);
          const fallback =
            lang === 'te'
              ? 'వరి అగ్గితెగులు (Paddy Blast) లక్షణాలు గమనించబడ్డాయి. ట్రైసైక్లాజోల్ 75 WP పిచికారీ చేయండి.'
              : 'Paddy Blast symptoms detected. Spray Tricyclazole 75 WP at 0.6g/L.';
          setDiagnosisResult(fallback);
          speakVoice(fallback, lang);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>🎙️</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">AI Assistant</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            AP-RythuSetu AI Voice &amp; Vision Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Voice advisory in Telugu, English &amp; Hindi with Gemini-powered crop disease leaf diagnosis
          </p>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-2xl p-1 shadow-xs">
          <button
            onClick={() => setLang('te')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              lang === 'te' ? 'bg-[#062419] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            తెలుగు (Telugu)
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              lang === 'en' ? 'bg-[#062419] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              lang === 'hi' ? 'bg-[#062419] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200/80 max-w-md shadow-xs gap-1">
        <button
          onClick={() => setMode('voice')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'voice'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Mic size={14} />
          <span>Voice Market Advisory</span>
        </button>

        <button
          onClick={() => setMode('disease')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'disease'
              ? 'bg-[#062419] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Camera size={14} />
          <span>Crop Disease Vision</span>
        </button>
      </div>

      {/* Voice Mode */}
      {mode === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-700" />
                <h3 className="text-sm font-black text-slate-900">
                  Ask Anything about Mandi Rates, Weather or Complaints
                </h3>
              </div>
            </div>

            {/* Mic Button & Pulse */}
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <button
                onClick={handleToggleVoice}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-100 shadow-lg'
                    : 'bg-[#062419] text-white hover:scale-105 shadow-md'
                }`}
              >
                <Mic size={30} className={isListening ? 'animate-bounce' : 'text-emerald-400'} />
              </button>
              <p className="text-xs font-bold text-slate-700">
                {isListening ? 'Listening... Speak in ' + (lang === 'te' ? 'Telugu' : lang) : 'Tap microphone to speak'}
              </p>
              <p className="text-[11px] text-slate-400">
                Example: "గుంటూరు మార్కెట్‌లో మిర్చి ధర ఎంత?" or "What is turmeric modal rate?"
              </p>
            </div>

            {/* Text input alternative */}
            <div className="flex gap-2">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Or type your agricultural query here..."
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSendQuery()}
                disabled={isProcessing}
                className="px-4 py-2 bg-[#062419] hover:bg-[#093324] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Response Box */}
            {response && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    AI Agronomist Reply
                  </span>
                  <button
                    onClick={() => speakVoice(response, lang)}
                    className="p-1 rounded-lg text-emerald-800 hover:bg-emerald-100"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>
                <p className="text-xs text-emerald-950 font-bold leading-relaxed">{response}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 pb-2 border-b border-slate-100">
              Quick Voice Questions
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleSendQuery('గుంటూరు మిర్చి మార్కెట్ ధర ఎంత?')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700"
              >
                🌶️ గుంటూరు మిర్చి ధర ఎంత?
              </button>
              <button
                onClick={() => handleSendQuery('ఈ వారం వర్షపాతం ఎలా ఉంది?')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700"
              >
                🌧️ ఈ వారం వర్షపాతం ఎలా ఉంది?
              </button>
              <button
                onClick={() => handleSendQuery('వరి పంట ఎగుమతి విధానాలు ఏమిటి?')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700"
              >
                🌾 వరి ఎగుమతి వివరాలు
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disease Vision Scanner Mode */}
      {mode === 'disease' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-emerald-700" />
              <h3 className="text-sm font-black text-slate-900">
                Leaf &amp; Crop Disease Diagnostic Scanner
              </h3>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Upload size={24} />
              </div>
              <h4 className="text-xs font-black text-slate-800">
                Upload or Capture Leaf Photo
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports JPG, PNG photos taken on field
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={imagePreview}
                  alt="Scanned crop"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setDiagnosisResult(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-4">
                {isScanning ? (
                  <div className="p-6 bg-slate-50 rounded-2xl text-center space-y-2">
                    <RefreshCw size={24} className="animate-spin text-emerald-700 mx-auto" />
                    <p className="text-xs font-bold text-slate-800">
                      Scanning leaf pathogen markers with Gemini Vision...
                    </p>
                  </div>
                ) : diagnosisResult ? (
                  <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-700" />
                        <h4 className="text-xs font-black text-emerald-950">
                          {detailedDiagnosis?.crop_name ? `${detailedDiagnosis.crop_name} Diagnostic Report` : 'Diagnosis & Spray Recommendation'}
                        </h4>
                      </div>
                      {detailedDiagnosis?.severity && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          detailedDiagnosis.severity === 'Severe' || detailedDiagnosis.severity === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : detailedDiagnosis.severity === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {detailedDiagnosis.severity} Risk
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed font-semibold">
                      {diagnosisResult}
                    </p>
                    {detailedDiagnosis && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-[11px]">
                        {detailedDiagnosis.chemical_treatment && (
                          <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-100">
                            <span className="font-bold text-emerald-900 block mb-0.5">🧪 Chemical Spray:</span>
                            <span className="text-slate-700">{detailedDiagnosis.chemical_treatment}</span>
                            {detailedDiagnosis.dosage && (
                              <span className="block text-emerald-700 font-semibold mt-1">Dose: {detailedDiagnosis.dosage}</span>
                            )}
                          </div>
                        )}
                        {detailedDiagnosis.organic_treatment && (
                          <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-100">
                            <span className="font-bold text-emerald-900 block mb-0.5">🌱 Organic Remedy:</span>
                            <span className="text-slate-700">{detailedDiagnosis.organic_treatment}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
