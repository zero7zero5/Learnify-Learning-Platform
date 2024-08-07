// LessonForm.js

import React from 'react';
import { Input, VStack, IconButton } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";


const LessonForm = ({ lesson, sectionIndex, sections, setSections, lessonIndex, children }) => {
  const updateLesson = (e, field) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons[lessonIndex][field] = e.target.value;
    setSections(updatedSections);
  };

  return (
    <VStack spacing={2} mb={2} ml={8}>
      <Input
        value={lesson.title}
        onChange={(e) => updateLesson(e, 'title')}
        placeholder="Lesson Title"
        className="border rounded-md px-2 py-1 mr-2"
      />
      <Input
        value={lesson.videoUrl}
        onChange={(e) => updateLesson(e, 'videoUrl')}
        placeholder="Video URL"
        className="border rounded-md px-2 py-1 mr-2"
      />
      <Input
        type="number"
        value={lesson.lessonNumber}
        onChange={(e) => updateLesson(e, 'lessonNumber')}
        placeholder="Lesson Number"
        className="border rounded-md px-2 py-1 mr-2"
      />
      <Input
        value={lesson.lessonDescription}
        onChange={(e) => updateLesson(e, 'lessonDescription')}
        placeholder="Lesson Description"
        className="border rounded-md px-2 py-1 mr-2"
      />
      <IconButton
        aria-label="Delete Lesson"
        icon={<IoClose />}
        colorScheme="red"
        onClick={() => children.props.onClick()}
      />
    </VStack>
  );
};

export default LessonForm;
