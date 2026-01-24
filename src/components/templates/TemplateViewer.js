import React from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./template4";
import Template5 from "./template5";
import Template6 from "./Template6";
import Template7 from "./Template7"; // ADD THIS

const TemplateViewer = ({ templateId }) => {
  const templateMap = {
    1: Template1,
    2: Template2,
    3: Template3,
    4: Template4,
    5: Template5,
    6: Template6,
    7: Template7 // ADD THIS
  };

  const SelectedTemplate = templateMap[parseInt(templateId)];
  
  if (!SelectedTemplate) {
    return (
      <div className="template-error">
        <h1>Template Not Found</h1>
        <p>Template {templateId} doesn't exist. Please use a valid template.</p>
        <a href="/">Return to Home</a>
      </div>
    );
  }
  
  return <SelectedTemplate />;
};

export default TemplateViewer;