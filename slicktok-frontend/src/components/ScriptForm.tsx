import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area"

const ScriptForm = () => {
  const [audienceCountry, setAudienceCountry] = useState("");
  const [audienceAgeRange, setAudienceAgeRange] = useState("");
  const [videoType, setVideoType] = useState("");
  const [videoTopics, setVideoTopics] = useState("");
  const [script, setScript] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when starting the request
    try {
      const response = await axios.post(
        "http://0.0.0.0:8000/generate_script",
        {
          audience_country: audienceCountry,
          audience_age_range: audienceAgeRange,
          video_type: videoType,
          video_topics: videoTopics.split(",").map((topic) => topic.trim()),
        }
      );

      // Logging the response to understand its structure
      console.log("Response data:", response.data);

      // Extract the markdown string from the response array
      const scriptContent = Array.isArray(response.data) && response.data.length > 0
        ? response.data[0]
        : "";

      console.log("Script content:", scriptContent);

      setScript(scriptContent);
      setError("");
    } catch (error) {
      console.error("Error generating script:", error);
      setError("Failed to generate script. Please try again.");
    }
    setLoading(false);  // Set loading to false when the request is done
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 pb-10">
        <div className="pt-3 pb-3">
          <Select onValueChange={setAudienceCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Audience Country</SelectLabel>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-3 pb-3">
          <Select onValueChange={setAudienceAgeRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Audience Age Range</SelectLabel>
                <SelectItem value="13-18">13-18</SelectItem>
                <SelectItem value="18-23">18-23</SelectItem>
                <SelectItem value="23-28">23-28</SelectItem>
                <SelectItem value="28-33">28-33</SelectItem>
                <SelectItem value="33-38">33-38</SelectItem>
                <SelectItem value="38-43">38-43</SelectItem>
                <SelectItem value="Above 43">Above 43</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-3 pb-3">
          <RadioGroup value={videoType} onValueChange={setVideoType}>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Funny" id="r1" />
                <Label htmlFor="r1">Funny</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Educational" id="r2" />
                <Label htmlFor="r2">Educational</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Emotional" id="r3" />
                <Label htmlFor="r3">Emotional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Informative" id="r4" />
                <Label htmlFor="r4">Informative</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Alarming" id="r5" />
                <Label htmlFor="r5">Alarming</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Romantic" id="r6" />
                <Label htmlFor="r6">Romantic</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div className="pt-3 pb-3">
          <Input
            type="text"
            placeholder="Add topic(s), e.g. cat, economics"
            value={videoTopics}
            onChange={(e) => setVideoTopics(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full hover:bg-slate-700" disabled={loading}>
          {loading ? "Generating..." : "Generate Script"}
        </Button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {script && (
        <ScrollArea className="h-[350px] w-[450px] rounded-md border">
          <div className="mt-4 bg-white p-4 shadow-md rounded-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Output:</h2>
            <ReactMarkdown>{script}</ReactMarkdown>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ScriptForm;








