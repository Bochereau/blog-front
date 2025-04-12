import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { X, Search, Check } from "lucide-react";
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
          <Link to={`/posts/${post.slug}`}>
          <div key={post._id} className="list-post">
              <div className="list-post-link">
                <span className="list-post-title">{post.title}</span>{post.subtitle && ", " + post.subtitle}
              </div>
            <p className="list-post-meta">
              Par <strong className="important">{post.author}</strong> le <time className="important">{reverseDate(post.createdAt)}</time>
            </p>
            <div className="list-post-themes">
              {post.themes.map((theme) => (
                <p className="list-post-themes-item">
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
