export default function Error({ message }) {
    if (!message) return null;
  
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-yellow-700">⚠️</span>
          <p className="ml-2 text-yellow-700">{message}</p>
        </div>
      </div>
    );
}