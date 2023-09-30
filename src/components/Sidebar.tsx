import { Checkbox, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div
        style={{ justifyContent: "space-between", display: "flex" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text size="4">{title}</Text>
        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </div>
      {open && children}
    </div>
  );
};

export default function Sidebar() {
  const HASHTAGS = ["cookies", "italian"];

  const router = useRouter();

  // @ts-expect-error
  const hashtags = getHashtags(router.query?.hashtags);

  const toggleHashtags = (hashtag: string) => {
    let newHashtags;
    if (hashtags.indexOf(hashtag) != -1) {
      newHashtags = hashtags.filter((h) => h != hashtag);
    } else {
      newHashtags = [...hashtags, hashtag];
    }

    if (newHashtags.length > 0) {
      router.push("?hashtags=" + newHashtags.join(","));
    } else {
      router.push("");
    }
  };

  return (
    <div
      className="w-1/4 p-4 border-r"
      style={{
        maxWidth: 200,
      }}
    >
      <CollapsibleSection title="Hashtags">
        {HASHTAGS.map((c) => (
          <div key={c}>
            <Text size="2">
              <label>
                <Checkbox
                  className="mr-1"
                  checked={hashtags.indexOf(c) != -1}
                  onClick={() => toggleHashtags(c)}
                />{" "}
                {c}
              </label>
            </Text>
          </div>
        ))}
      </CollapsibleSection>
    </div>
  );
}
