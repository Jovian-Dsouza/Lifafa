import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const DatePicker = ({
  time,
  setTime
}) => {
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => setIsTimePickerVisible(true)}
          className="bg-white border border-gray-200 p-3 rounded-lg flex-row justify-between items-center mb-4 focus:border-[#5166EE]"
        >
          <Text className={time ? "" : "text-[#B9B9B9]"}>
            {time ? dayjs(time).format("D MMM YYYY") : "Add end date"}
          </Text>
          <ClockIcon fill="#FFFFFF" color="black" size={20} />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="date"
          onConfirm={(time) => {
            setTime(time);
            setIsTimePickerVisible(false);
          }}
          onCancel={() => {
            setIsTimePickerVisible(false);
          }}
        />
      </>
    );};
