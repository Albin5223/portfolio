INSERT INTO project (id,title, description, github_url, is_personal) VALUES 
(1,
    'Weather Map Java React', 
    'Application web full-stack affichant une carte météo interactive. Backend en Java Spring Boot consommant l''API OpenWeatherMap, frontend en React avec Leaflet pour la carte.',
    'https://github.com/Albin5223/weatherMap', 
    FALSE
);
INSERT INTO project_technologies (project_id, technologies) VALUES 
(1, 'TypeScript'), (1, 'Spring Boot'), (1, 'React'), (1, 'Leaflet'), (1, 'OpenWeatherMap API');

INSERT INTO project (id,title, description, github_url, is_personal) VALUES 
(2,
    'Virtual Painter', 
    'Application web de peinture virtuelle utilisant la détection de mouvements via la webcam. Développée en Python avec OpenCV et Mediapipe',
    'https://github.com/Albin5223/virtual-painter', 
    TRUE
);
INSERT INTO project_technologies (project_id, technologies) VALUES 
(2, 'Python'), (2, 'OpenCV'), (2, 'Mediapipe');