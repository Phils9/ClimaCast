export default function Error({ message }) {
  if (!message) return null;
  
  return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-center">
          <span className="text-red-600 mr-2">⚠️</span>
          <p className="text-red-700 font-medium">{message}</p>
      </div>
      </div>
  );
}