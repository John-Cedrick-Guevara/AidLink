import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";

const LockCard = ({title, message} : {title: string, message: string}) => {
  return (
    <Card className="w-full max-w-sm mx-auto border border-gray-200 shadow-md rounded-2xl bg-linear-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm mt-1">
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
          Log In
        </Button>
      </CardContent>
      <CardFooter className="text-center text-xs text-gray-400 mt-1">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </CardFooter>
    </Card>
  );
};

export default LockCard;
