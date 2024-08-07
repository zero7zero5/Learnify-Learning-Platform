import React from "react";

export const AddVideos = () => {
  const numberArray = [2, 3, 5];

  const handleSubmit = async (e) => {
      e.preventDefault();
    const { name, value, files } = e.target;

      try {
        const formData = new FormData();
        
        // Loop through each section
        numberArray.forEach((item, sectionNumber) => {
          // Loop through each lesson in the section
          [...Array(item)].forEach((_, lessonNumber) => {
            // Get the file input element
            const fileInput = document.querySelector(`input[name="section-${sectionNumber + 1}-lesson-${lessonNumber + 1}"]`);
            // Check if a file is selected
            if (fileInput && fileInput.files.length > 0) {
              // Append the file to FormData
              formData.append(`section-${sectionNumber + 1}-lesson-${lessonNumber + 1}`, fileInput.files[0]);
            }
          });
        });
        console.log(formData);
        // Send formData to the backend
        const response = await fetch('/api/uploadVideos', {
          method: 'POST',
          body: formData
        });
  
        // Check the response status
        if (response.ok) {
          console.log('Videos uploaded successfully');
        } else {
          console.error('Failed to upload videos');
        }
  
      } catch (error) {
        console.error("Error uploading videos:", error);
      }
    };

  return (
    <div className="container">
      <h1 className="text-center">Upload Videos to each lesson</h1>
      <form onSubmit={handleSubmit} className="ml-[10%] mr-[10%]">
        {numberArray.map((item, sectionNumber) => (
          <div key={sectionNumber+1} className="m-12">
            <h3>
              Section {sectionNumber + 1}
              <br></br>
            </h3>
            {/* Outer loop to print each number */}
            {[...Array(item)].map((_, lessonNumber) => (
              <div>
                <label key={lessonNumber}>
                  Upload lesson {lessonNumber + 1}
                  <br></br>
                </label>
                <input type="file" name={`section-${sectionNumber + 1}-lesson-${lessonNumber + 1}`}></input>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Upload Videos
        </button>
      </form>
    </div>
  );
};
