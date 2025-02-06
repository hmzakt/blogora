import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ name, control, label, defaultValue = "All yours", apiKey }) {
  if (!name || !control) {
    console.error("RTE component requires both 'name' and 'control' props.");
    return null;
  }

  apiKey = "yukbsrtrwomrkry6f19rmzb4h53uj36b59vu86nz99974l7j" //hide this key 

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={apiKey}
            init={{
              plugins: [
                "anchor", "autolink", "charmap", "codesample", "emoticons", "image", "link", "lists","searchreplace", "table", "visualblocks", "wordcount",
                "checklist", "mediaembed", "casechange", "export", "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "editimage", "advtemplate", "ai", "mentions", "tinycomments", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss", "markdown", "importword", "exportword", "exportpdf"
              ],
              toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue={defaultValue}
            value={value} // Ensure form state value is synced
            onEditorChange={onChange} // Update form state
          />
        )}
      />
    </div>
  );
}


