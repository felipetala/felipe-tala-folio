import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function PhotoGallery() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For connection or fetch errors

  const fetchCollections = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase.storage
        .from('photo-collections')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Filter only folders (i.e., collections)
      const folders = data.filter((item) => item.name && item.metadata?.eTag === undefined);

      setCollections(folders);
    } catch (err) {
      console.error('Error fetching photo collections:', err.message);
      setError('Unable to load photo collections. Please check your connection and try again.');
      setCollections([]); // Ensure no fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleRetry = () => {
    fetchCollections();
  };

  return (
    <div className="gallery-container">
      {loading && <p>Loading photo collections...</p>}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {!loading && !error && collections.length === 0 && (
        <p>No photo collections found.</p>
      )}

      {!loading && !error && collections.length > 0 && (
        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.name} className="collection-item">
              <h3>{collection.name}</h3>
              {/* You can fetch and display thumbnails from each folder if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;
