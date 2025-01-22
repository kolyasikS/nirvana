import * as React from "react";
import {cn} from "@lib/utils-client";

const Loader = (() => (
  <div className={cn(`w-6 h-6 border-4 border-gray-900 border-t-cyan-500 rounded-full animate-spin`)}></div>
))

export { Loader }