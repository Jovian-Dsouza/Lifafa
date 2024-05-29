
import Clipboard from "@react-native-clipboard/clipboard";
import { Share } from "react-native";
import { BASE_URL } from "../constants";

export async function handleShare(id) {
  try {
    const url = `${BASE_URL}/Redeem/${id}`;
    const result = await Share.share({
      title: "Lifafa",
      message: `Hey there! I've created a Lifafa for you. Click on the link below to redeem it:\n\n${url}`,
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function handleCopyLink(id) {
  try {
    const url = `${BASE_URL}/Redeem/${id}`;
    Clipboard.setString(url);
  } catch (error) {
    console.error("handleCopy: ", error);
  }
}
