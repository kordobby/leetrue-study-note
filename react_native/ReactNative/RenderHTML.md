```javascript
import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import { useFonts, SpaceMono_400Regular } from "@expo-google-fonts/space-mono";

function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    "space-mono": SpaceMono_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return <>{children}</>;
}

const source = {
  html: `<p style="font-family: 'space-mono'; padding: 10px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat.
</p>`,
};

const systemFonts = ["space-mono", ...defaultSystemFonts];

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <FontLoader>
      <RenderHtml
        contentWidth={width}
        source={source}
        systemFonts={systemFonts}
        enableExperimentalMarginCollapsing={true}
      />
    </FontLoader>
  );
}
```
