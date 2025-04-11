import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { reverseDate } from "../../utils";

import "./style.scss";

const List = () => {
  const posts = useSelector((state) => state.posts);
  const themes = useSelector((state) => state.themes);
  const light = useSelector((state) => state.lightTheme);
  console.log(themes)

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
    return posts.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
      const matchThemes =
        selectedThemes.length === 0 ||
        (post.themes && post.themes.some((theme) => selectedThemes.includes(theme._id)));
      return matchTitle && matchThemes;
    });
  }, [posts, search, selectedThemes]);

  return (
    <div className={classNames("list", { "bk-p--light": light, "bk-p--dark": !light })}>
      <h2 className="list-title">Liste des articles</h2>
      <p className="list-description">
        Retrouvez sur cette page la liste des articles disponibles.
      </p>

      <div className="list-search">
        <input
          type="text"
          placeholder="Rechercher un article ou un thème"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="list-filters">
        {themes.map((theme) => (
          <button
            key={theme._id}
            className={classNames("list-filter-tag", {
              selected: selectedThemes.includes(theme._id),
            })}
            style={{ backgroundColor: theme.color }}
            onClick={() => toggleTheme(theme._id)}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <div className="list-results">
        {filteredPosts.length === 0 && (
          <p className="list-no-results">
            Aucun article ne correspond à votre recherche.
          </p>
        )}

        {filteredPosts.map((post) => (
          <div key={post._id} className="list-post">
            <Link to={`/posts/${post.slug}`} className="list-post-title">
              {post.title}
            </Link>
            <p className="list-post-meta">
              Par <strong>{post.author}</strong> le <time>{reverseDate(post.createdAt)}</time>
            </p>
            <p className="list-post-subtitle">{post.subtitle}</p>
            {post.themes?.length > 0 && (
              <p className="list-post-themes">
                Thèmes : {post.themes.map((theme) => theme.name).join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
