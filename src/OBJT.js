import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'

export default function OBJT(properties) {
  if (!properties.data) {
    return null;
  }

  let media_json = JSON.parse(atob(properties.data));
  let media_obj = media_json ? media_json.media_obj : undefined;
  let media_png = media_json ? media_json.media_png : undefined;

  return ([]);
}
