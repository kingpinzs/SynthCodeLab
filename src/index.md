---
layout: layout.njk
title: Home
---

<main>
    <div class="container">
        <section id="overview" class="active">
            <h2>Course Overview</h2>
            <p>Welcome to the OS Creation Course! This course will guide you through the process of creating your own operating system from scratch, starting with bootstrapping and ending with a functional terminal to enter commands. Each lesson includes detailed explanations, code snippets, and quizzes to test your knowledge.</p>
        </section>

        <section id="lessons">
            <h2>Lessons</h2>
            <div id="lessonsContent">
                <ol>
                    {% for lesson in collections.lessons %}
                    <li><a href="{{ lesson.url }}">{{ lesson.title }}</a></li>
                    {% endfor %}
                </ol>
            </div>
        </section>

        <section id="progress">
            <h2>Your Progress</h2>
            <p>Track your progress through the course and see which lessons and quizzes you have completed.</p>
        </section>

        <section id="preferences">
            <h2>Preferences</h2>
            <form id="preferencesForm">
                <label for="saveProgress">Save Progress</label>
                <input type="checkbox" id="saveProgress" checked>
                <br>
                <label for="osSelection">Operating System</label>
                <select id="osSelection">
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                    <option value="MacOS">MacOS</option>
                </select>
                <br>
                <label for="languageSelection">Preferred Language</label>
                <select id="languageSelection">
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="Rust">Rust</option>
                </select>
                <br>
                <button type="button" onclick="savePreferences()">Save Preferences</button>
            </form>
        </section>

        <section id="resources">
            <h2>Additional Resources</h2>
            <ul>
                <li><a href="https://github.com/pages-example">GitHub Repository</a></li>
                <li><a href="https://docs.github.com/en/pages">GitHub Pages Documentation</a></li>
            </ul>
        </section>
            <!-- OS Selection Modal -->
    <div id="osModal" class="modal">
        <div class="modal-content">
            <h2>Welcome! Select Your OS</h2>
            <p>Which operating system are you using?</p>
            <button onclick="selectOS('Windows')">Windows</button>
            <button onclick="selectOS('Linux')">Linux</button>
            <button onclick="selectOS('MacOS')">MacOS</button>
        </div>
    </div>
    </div>
</main>
