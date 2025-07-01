import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import ProcessingModal from '../components/ProcessingModal';

const { FiUpload, FiFile, FiX, FiPlay, FiSettings, FiBrain } = FiIcons;

const Upload = () => {
  const { dispatch } = useContent();
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'application/json': ['.json'],
      'text/csv': ['.csv']
    },
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles.map(file => ({
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
        status: 'ready'
      }))]);
    }
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one transcript file');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    try {
      for (const fileItem of files) {
        const content = await fileItem.file.text();
        
        // Step 1: Extract insights
        setProcessingStep(1);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const insights = await extractInsights(content);
        
        // Step 2: Generate content
        setProcessingStep(2);
        await new Promise(resolve => setTimeout(resolve, 3000));
        const generatedContent = await generateContent(content, insights);
        
        // Step 3: Distribute content
        setProcessingStep(3);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add to state
        dispatch({
          type: 'ADD_TRANSCRIPT',
          payload: {
            id: fileItem.id,
            name: fileItem.name,
            content,
            uploadedAt: new Date(),
            processed: true
          }
        });

        dispatch({
          type: 'ADD_INSIGHTS',
          payload: insights
        });

        dispatch({
          type: 'ADD_GENERATED_CONTENT',
          payload: generatedContent
        });
      }

      toast.success(`Successfully processed ${files.length} transcript(s)`);
      setFiles([]);
    } catch (error) {
      toast.error('Error processing files');
      console.error(error);
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  const extractInsights = async (content) => {
    // Simulate AI insight extraction
    return [
      {
        id: uuidv4(),
        type: 'emotional_breakthrough',
        content: 'Vulnerability leads to authentic connection',
        confidence: 0.95,
        timestamp: new Date(),
        context: content.substring(0, 200) + '...'
      },
      {
        id: uuidv4(),
        type: 'core_belief',
        content: 'Growth happens in discomfort zones',
        confidence: 0.87,
        timestamp: new Date(),
        context: content.substring(200, 400) + '...'
      }
    ];
  };

  const generateContent = async (transcript, insights) => {
    // Simulate AI content generation
    return [
      {
        id: uuidv4(),
        type: 'blog_post',
        title: 'Finding Clarity in Chaos: A Personal Journey',
        content: 'Enhanced blog post content based on insights...',
        status: 'draft',
        createdAt: new Date(),
        insights: insights.map(i => i.id)
      },
      {
        id: uuidv4(),
        type: 'social_post',
        platform: 'twitter',
        content: 'Breakthrough moment: Sometimes the greatest growth happens when we lean into discomfort. 🌱 #PersonalGrowth',
        status: 'ready',
        createdAt: new Date(),
        insights: [insights[0].id]
      },
      {
        id: uuidv4(),
        type: 'book_chapter',
        title: 'Chapter 7: The Vulnerability Paradox',
        content: 'Deep, emotionally enhanced chapter content...',
        status: 'draft',
        createdAt: new Date(),
        insights: insights.map(i => i.id)
      }
    ];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Transcript Files
          </h1>
          <p className="text-lg text-gray-600">
            Transform your livestream transcripts into emotionally-rich content
          </p>
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop files here' : 'Upload transcript files'}
          </h3>
          <p className="text-gray-600">
            Drag and drop your .txt, .json, or .csv files here, or click to browse
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Files Ready for Processing ({files.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiFile} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{fileItem.name}</p>
                      <p className="text-sm text-gray-600">
                        {(fileItem.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <SafeIcon icon={FiX} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Processing Options */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiBrain} className="text-primary-600" />
                <span className="font-medium">Insight Extraction</span>
              </div>
              <p className="text-sm text-gray-600">
                Extract emotional themes and breakthrough moments
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiSettings} className="text-primary-600" />
                <span className="font-medium">Content Generation</span>
              </div>
              <p className="text-sm text-gray-600">
                Create blog posts, social content, and book chapters
              </p>
            </div>
          </div>
        </div>

        {/* Process Button */}
        <div className="text-center">
          <button
            onClick={processFiles}
            disabled={files.length === 0 || isProcessing}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <SafeIcon icon={FiPlay} />
            <span>{isProcessing ? 'Processing...' : 'Start Processing'}</span>
          </button>
        </div>
      </motion.div>

      <ProcessingModal 
        isOpen={isProcessing}
        currentStep={processingStep}
      />
    </div>
  );
};

export default Upload;