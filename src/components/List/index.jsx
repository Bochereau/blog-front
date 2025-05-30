import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { X, Search, Check } from "lucide-react";

import { reverseDate } from "../../utils";

import "./style.scss";

const List = () => {
  const posts = useSelector((state) => state.posts);
  const themes = useSelector((state) => state.themes);

  const publishedPosts = posts.filter(post => post.isPublished === true);

  const [search, setSearch] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleTheme = (themeId) => {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== themeId));
    } else {
      setSelectedThemes([...selectedThemes, themeId]);
    }
  };

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
      const matchThemes =
        selectedThemes.length === 0 ||
        (post.themes && post.themes.some((theme) => selectedThemes.includes(theme._id)));
      return matchTitle && matchThemes;
    });
  }, [publishedPosts, search, selectedThemes]);

  return (
    <div className="list">
      <div className="list-filters">
        <div className="list-search">
          <Search className="list-search-icon" />
          <input
            type="text"
            placeholder="Rechercher un article"
            value={search}
            onChange={handleSearch}
          />
          {search && (
            <button className="list-search-clear" onClick={() => setSearch("")}>
              <X />
            </button>
          )}
        </div>

        <div className="list-themes">
          <p className="list-themes-title">Filtrer par thème : </p>
          <div className="list-themes-tag">
            {themes.map((theme) => (
              <button
                key={theme._id}
                className={"list-themes-tag-item"}
                style={{ backgroundColor: theme.color }}
                onClick={() => toggleTheme(theme._id)}
              >
                {selectedThemes.includes(theme._id) && (
                  <Check size={15} color={"white"} />
                )}
                {theme.name}
              </button>
            ))}
          </div>
        </div>

      </div>


      <div className="list-results">
        {filteredPosts.length === 0 && (
          <p className="list-no-results">
            Aucun article ne correspond à votre recherche.
          </p>
        )}

        {filteredPosts.map((post) => (
          <Link to={`/posts/${post.slug}`} key={post._id}>
            <div className="list-post">
              <div className="list-post-link">
                <img src={post.mainImage}></img>
                <div className="list-post-text">
                  <p><span className="list-post-title">{post.title}</span>{post.subtitle && ", " + post.subtitle}</p>
                  <p className="list-post-meta">
                    Par <strong className="important">{post.author}</strong> le <time className="important">{reverseDate(post.publishedAt)}</time>
                  </p>
                </div>
              </div>
              <div className="list-post-themes">
                {post.themes.map((theme) => (
                  <p className="list-post-themes-item" key={theme.name}>
                    {theme.name}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
