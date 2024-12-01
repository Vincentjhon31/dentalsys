import React from "react";
import moment from "moment";

const TimeSelector = ({
    availableTimes,
    selectedStartTime,
    selectedEndTime,
    onStartTimeChange,
    onEndTimeChange,
}) => {
    return (
        <div className="space-y-6">
            {/* Start Time Section */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Start Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                        <button
                            key={time}
                            type="button" // Ensures this button doesn't trigger form submission
                            className={`px-4 py-2 rounded ${
                                selectedStartTime === time
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => onStartTimeChange(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* End Time Section */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    End Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {availableTimes
                        .filter((time) =>
                            moment(time, "hh:mm A").isAfter(
                                moment(selectedStartTime, "hh:mm A")
                            )
                        )
                        .map((time) => (
                            <button
                                key={time}
                                type="button" // Ensures this button doesn't trigger form submission
                                className={`px-4 py-2 rounded ${
                                    selectedEndTime === time
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                                onClick={() => onEndTimeChange(time)}
                            >
                                {time}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TimeSelector;
